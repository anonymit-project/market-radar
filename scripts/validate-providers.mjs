#!/usr/bin/env node
/**
 * Market Radar - validación aislada de proveedores gratuitos.
 * Node.js >= 18. No dependencies. Never prints or persists credentials.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "validation-results");
const EODHD_MAX_REQUESTS = 12;
const EODHD_WINDOW_DAYS = 7;
const REQUEST_TIMEOUT_MS = 20_000;

const EODHD_SYMBOLS = [
  { asset: "NVIDIA", symbol: "NVDA.US", currency: "USD", market: "XNAS" },
  { asset: "Microsoft", symbol: "MSFT.US", currency: "USD", market: "XNAS" },
  { asset: "Meta Platforms", symbol: "META.US", currency: "USD", market: "XNAS" },
  { asset: "Amazon", symbol: "AMZN.US", currency: "USD", market: "XNAS" },
  { asset: "Johnson & Johnson", symbol: "JNJ.US", currency: "USD", market: "XNYS" },
  { asset: "ASML", symbol: "ASML.AS", currency: "EUR", market: "XAMS" },
  { asset: "SAP", symbol: "SAP.XETRA", currency: "EUR", market: "XETR" },
  { asset: "Banco Santander", symbol: "SAN.MC", currency: "EUR", market: "BMEX" },
  { asset: "SPDR S&P 500 ETF", symbol: "SPY.US", currency: "USD", market: "ARCX" },
  { asset: "Vanguard FTSE All-World UCITS ETF", symbol: "VWCE.XETRA", currency: "EUR", market: "XETR" },
  { asset: "Bitcoin", symbol: "BTC-USD.CC", currency: "USD", market: "CRYPTO-AGGREGATE" },
  { asset: "Ethereum", symbol: "ETH-USD.CC", currency: "USD", market: "CRYPTO-AGGREGATE" },
];
const ALPACA_SYMBOLS = ["NVDA", "MSFT", "META", "AMZN", "JNJ", "SPY"];

function isoDate(date) { return date.toISOString().slice(0, 10); }
function dateDaysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return isoDate(date);
}
function redact(value, secrets) {
  let result = String(value ?? "");
  for (const secret of secrets.filter(Boolean)) result = result.split(secret).join("[REDACTED]");
  return result.slice(0, 300);
}
async function loadLocalEnv() {
  try {
    const content = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const separator = line.indexOf("=");
      if (separator < 1) continue;
      const name = line.slice(0, separator).trim();
      let value = line.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      if (/^[A-Z][A-Z0-9_]*$/.test(name) && !process.env[name]) process.env[name] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
function emptyProvider(status, note) {
  return { status, note, requestsAttempted: 0, quotaUnitsEstimated: 0, symbols: [] };
}
async function fetchJson(url, options = {}, secrets = []) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let body;
    try { body = text ? JSON.parse(text) : null; } catch { body = null; }
    if (!response.ok) {
      const providerMessage = body?.message || body?.error || ("HTTP " + response.status);
      return { ok: false, statusCode: response.status, error: redact(providerMessage, secrets) };
    }
    return { ok: true, statusCode: response.status, body };
  } catch (error) {
    const message = error?.name === "AbortError" ? "Tiempo de espera agotado" : "Error de red o conexión";
    return { ok: false, statusCode: null, error: redact(message, secrets) };
  } finally {
    clearTimeout(timeout);
  }
}
function mapEodhdBar(bar) {
  return {
    timestamp: bar.date ?? null, open: bar.open ?? null, high: bar.high ?? null,
    low: bar.low ?? null, close: bar.close ?? null,
    adjustedClose: bar.adjusted_close ?? null, volume: bar.volume ?? null,
  };
}
async function testEodhd(token, from, to) {
  const result = {
    provider: "EODHD", planAssumption: "Free (cuota documental: 20 llamadas/día)",
    status: "completed", requestsAttempted: 0, quotaUnitsEstimated: 0,
    dailyQuotaReference: 20, symbols: [],
  };
  for (const item of EODHD_SYMBOLS.slice(0, EODHD_MAX_REQUESTS)) {
    const url = new URL("https://eodhd.com/api/eod/" + encodeURIComponent(item.symbol));
    url.search = new URLSearchParams({
      api_token: token, fmt: "json", period: "d", order: "d", from, to,
    }).toString();
    result.requestsAttempted += 1;
    result.quotaUnitsEstimated += 1;
    const response = await fetchJson(url, {}, [token]);
    if (!response.ok) {
      result.symbols.push({
        ...item, status: response.statusCode === 404 ? "rejected_or_not_found" : "error",
        bars: [], error: response.error, httpStatus: response.statusCode,
      });
    } else if (!Array.isArray(response.body)) {
      result.symbols.push({
        ...item, status: "unexpected_response", bars: [],
        error: "La respuesta no tiene el formato de una lista de barras", httpStatus: response.statusCode,
      });
    } else {
      const bars = response.body.filter((bar) => bar && bar.date)
        .sort((a, b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, 3).map(mapEodhdBar);
      result.symbols.push({
        ...item, status: bars.length ? "accepted" : "no_recent_bars", bars, httpStatus: response.statusCode,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  result.acceptedSymbols = result.symbols.filter((x) => x.status === "accepted").map((x) => x.symbol);
  result.coverage = {
    requested: EODHD_SYMBOLS.length, accepted: result.acceptedSymbols.length,
    rejectedOrMissing: result.symbols.filter((x) => x.status === "rejected_or_not_found" || x.status === "no_recent_bars").length,
    errors: result.symbols.filter((x) => x.status === "error" || x.status === "unexpected_response").length,
  };
  result.quotaNote = "Estimación conservadora: 1 unidad por petición iniciada; comprobar el contador real de la cuenta EODHD.";
  return result;
}
const HISTORY_SAMPLE = [
  { asset: "NVIDIA", symbol: "NVDA.US", currency: "USD", market: "XNAS" },
  { asset: "ASML", symbol: "ASML.AS", currency: "EUR", market: "XAMS" },
  { asset: "Vanguard FTSE All-World UCITS ETF", symbol: "VWCE.XETRA", currency: "EUR", market: "XETR" },
  { asset: "Bitcoin", symbol: "BTC-USD.CC", currency: "USD", market: "CRYPTO-AGGREGATE" },
];
async function testEodhdHistory(token, from, to) {
  const result = {
    provider: "EODHD", planAssumption: "Free (referencia documental: hasta un año EOD)",
    status: "completed", testType: "historical-depth-sample",
    requestsAttempted: 0, quotaUnitsEstimated: 0, dailyQuotaReference: 20,
    requestedWindow: { from, to }, symbols: [],
  };
  for (const item of HISTORY_SAMPLE) {
    const url = new URL("https://eodhd.com/api/eod/" + encodeURIComponent(item.symbol));
    url.search = new URLSearchParams({
      api_token: token, fmt: "json", period: "d", order: "a", from, to,
    }).toString();
    result.requestsAttempted += 1;
    result.quotaUnitsEstimated += 1;
    const response = await fetchJson(url, {}, [token]);
    if (!response.ok) {
      result.symbols.push({ ...item, status: response.statusCode === 404 ? "rejected_or_not_found" : "error",
        bars: [], error: response.error, httpStatus: response.statusCode });
    } else if (!Array.isArray(response.body)) {
      result.symbols.push({ ...item, status: "unexpected_response", bars: [],
        error: "La respuesta no tiene el formato de una lista de barras", httpStatus: response.statusCode });
    } else {
      const rawBars = response.body.filter((bar) => bar && bar.date)
        .sort((a, b) => String(a.date).localeCompare(String(b.date)));
      result.symbols.push({
        ...item, status: rawBars.length ? "accepted" : "no_bars",
        barCount: rawBars.length, firstDate: rawBars[0]?.date ?? null,
        lastDate: rawBars.at(-1)?.date ?? null,
        bars: rawBars.map(mapEodhdBar), httpStatus: response.statusCode,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  result.coverage = {
    requested: HISTORY_SAMPLE.length,
    accepted: result.symbols.filter((x) => x.status === "accepted").length,
    errors: result.symbols.filter((x) => ["error", "unexpected_response", "rejected_or_not_found"].includes(x.status)).length,
  };
  result.quotaNote = "Cuatro peticiones individuales; estimación de cuatro unidades. Confirmar el contador real EODHD.";
  result.limitations = "La muestra evalúa hasta un año EOD y continuidad observable; no demuestra disponibilidad de más de un año ni valida exactitud o licencia.";
  return result;
}

function mapAlpacaBar(bar) {
  return {
    timestamp: bar.t ?? null, open: bar.o ?? null, high: bar.h ?? null,
    low: bar.l ?? null, close: bar.c ?? null, volume: bar.v ?? null,
    tradeCount: bar.n ?? null, vwap: bar.vw ?? null,
  };
}
async function testAlpaca(key, secret, from, to, feed) {
  const url = new URL("https://data.alpaca.markets/v2/stocks/bars");
  url.search = new URLSearchParams({
    symbols: ALPACA_SYMBOLS.join(","), timeframe: "1Day", start: from, end: to,
    limit: "100", adjustment: "raw", feed, sort: "desc",
  }).toString();
  const response = await fetchJson(url, {
    headers: { "APCA-API-KEY-ID": key, "APCA-API-SECRET-KEY": secret },
  }, [key, secret]);
  const result = {
    provider: "Alpaca", planAssumption: feed === "iex" ? "Basic gratuito; feed IEX solicitado explícitamente" : "Feed SIP solicitado explícitamente; requiere permiso de suscripción",
    status: response.ok ? "completed" : "error", requestsAttempted: 1, quotaUnitsEstimated: 1,
    requestMode: "Una única petición agrupada para seis símbolos",
    feedRequested: feed, adjustmentRequested: "raw", symbols: [],
  };
  if (!response.ok) {
    result.error = response.error;
    result.httpStatus = response.statusCode;
    result.coverage = { requested: ALPACA_SYMBOLS.length, accepted: 0, errors: ALPACA_SYMBOLS.length };
    return result;
  }
  const grouped = response.body?.bars ?? {};
  for (const symbol of ALPACA_SYMBOLS) {
    const bars = (Array.isArray(grouped[symbol]) ? grouped[symbol] : [])
      .sort((a, b) => String(b.t).localeCompare(String(a.t)))
      .slice(0, 3).map(mapAlpacaBar);
    result.symbols.push({
      asset: symbol, symbol, market: "USA", currency: "USD",
      status: bars.length ? "accepted" : "no_recent_bars", bars,
    });
  }
  result.acceptedSymbols = result.symbols.filter((x) => x.status === "accepted").map((x) => x.symbol);
  result.coverage = {
    requested: ALPACA_SYMBOLS.length, accepted: result.acceptedSymbols.length,
    missing: result.symbols.filter((x) => x.status !== "accepted").map((x) => x.symbol),
  };
  result.paginationTokenPresent = Boolean(response.body?.next_page_token);
  result.paginationNote = result.paginationTokenPresent
    ? "La respuesta anuncia más páginas; no se descargan para mantener la prueba pequeña."
    : "No se detectó una página adicional.";
  result.comparisonNote = feed === "iex"
    ? "Feed IEX: representa operaciones de ese centro de negociación, no el volumen consolidado SIP. Comparar fechas y precios con cautela; los volúmenes no son directamente equivalentes. adjustment=raw."
    : "Feed SIP y ajuste raw se solicitan expresamente; no mezclar con IEX ni con series ajustadas.";
  return result;
}

await loadLocalEnv();
const alpacaOnlyIex = process.argv.includes("--alpaca-only");
const historySampleOnly = process.argv.includes("--history-sample");
const eodhdToken = process.env.EODHD_API_TOKEN?.trim();
const alpacaKey = process.env.ALPACA_API_KEY?.trim();
const alpacaSecret = process.env.ALPACA_API_SECRET?.trim();
const to = isoDate(new Date());
const from = historySampleOnly ? "2025-11-24" : dateDaysAgo(EODHD_WINDOW_DAYS);
const report = {
  reportType: "market-radar-provider-validation",
  generatedAt: new Date().toISOString(),
  testMode: historySampleOnly ? "eodhd-history-sample-only" : alpacaOnlyIex ? "alpaca-only-iex" : "full-eodhd-and-alpaca-sip",
  testWindow: { from, to, calendarDays: EODHD_WINDOW_DAYS },
  scope: {
    eodhdSymbols: historySampleOnly ? HISTORY_SAMPLE.map((x) => x.symbol) : EODHD_SYMBOLS.length, eodhdMaximumRequests: historySampleOnly ? 4 : alpacaOnlyIex ? 0 : EODHD_MAX_REQUESTS,
    alpacaSymbols: ALPACA_SYMBOLS, barsKeptPerSymbol: 3, noRetries: true,
    credentialsWritten: false, credentialsPrinted: false,
  },
  credentialAvailability: {
    eodhdConfigured: Boolean(eodhdToken), alpacaConfigured: Boolean(alpacaKey && alpacaSecret),
  },
  providers: [],
};
console.log("Market Radar — prueba limitada de proveedores");
console.log("Ventana consultada: " + from + " a " + to + (historySampleOnly ? " (muestra histórica EOD)" : " (barras diarias recientes)") + ".");
console.log("No se mostrarán claves ni URLs con credenciales.");
if (alpacaOnlyIex) {
  report.providers.push({ provider: "EODHD", ...emptyProvider("skipped", "Modo --alpaca-only: EODHD no se consulta ni consume cuota.") });
} else if (eodhdToken) {
  console.log("EODHD: iniciando hasta 12 consultas individuales...");
  report.providers.push(await testEodhd(eodhdToken, from, to));
} else {
  report.providers.push({ provider: "EODHD", ...emptyProvider("skipped", "Falta EODHD_API_TOKEN en .env.local o en el entorno.") });
}
if (alpacaKey && alpacaSecret) {
  const feed = alpacaOnlyIex ? "iex" : "sip";
  console.log("Alpaca: iniciando una consulta agrupada para seis símbolos USA (feed " + feed.toUpperCase() + ")...");
  report.providers.push(await testAlpaca(alpacaKey, alpacaSecret, from, to, feed));
} else {
  report.providers.push({ provider: "Alpaca", ...emptyProvider("skipped", "Faltan ALPACA_API_KEY y/o ALPACA_API_SECRET; no se ha realizado ninguna petición.") });
}
await mkdir(OUTPUT_DIR, { recursive: true });
const filename = "provider-validation-" + new Date().toISOString().replace(/[:.]/g, "-") + ".json";
const outputPath = path.join(OUTPUT_DIR, filename);
await writeFile(outputPath, JSON.stringify(report, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
for (const provider of report.providers) {
  const accepted = provider.coverage?.accepted ?? 0;
  const requested = provider.coverage?.requested ?? provider.symbols?.length ?? 0;
  console.log(provider.provider + ": " + provider.status + "; cobertura " + accepted + "/" + requested +
    "; peticiones " + (provider.requestsAttempted ?? 0) + "; consumo estimado " + (provider.quotaUnitsEstimated ?? 0) + ".");
}
console.log("Informe guardado localmente en: " + path.relative(ROOT, outputPath));
console.log("Revisa el JSON antes de compartirlo. No debería contener credenciales; no lo publiques sin revisarlo.");
