# Data Sources — evaluación preliminar

**Estado:** investigación documental inicial; ningún proveedor está validado ni contratado. Precios y límites son los publicados en las páginas oficiales consultadas el 24-11-2026; pueden cambiar. Confirmar siempre el plan aplicable y los derechos por escrito antes de producción.

## 1. Criterios de validación
- Cobertura por país, bolsa, MIC, activo y ticker.
- Endpoint exacto, granularidad, frescura/latencia y disponibilidad histórica.
- Calendarios, splits, dividendos, ajustes y símbolos deslistados.
- Cuotas por minuto/día, pesos de endpoint, concurrencia y límites de WebSocket.
- Precio mensual real, facturación anual, impuestos y add-ons.
- Derechos de almacenamiento, caché, uso interno, visualización a tres usuarios, derivados, redistribución y uso con IA.
- Fiabilidad, SLA, soporte, estabilidad de esquemas y pruebas reproducibles.

## 2. Proveedores de mercado

| Proveedor | Plan gratuito / precio público visto | Cobertura y capacidades publicadas | Lectura inicial |
|---|---|---|---|
| EODHD | Free: 20 llamadas/día, un año EOD. EOD All-World $19.99/mes; EOD+Intraday $29.99/mes; All-in-One $99.99/mes (página personal consultada; precios comerciales pueden diferir). | EOD acciones, ETF, fondos, índices, FX y cripto; 70 bolsas listadas según Exchanges API; intradía y websocket en plan superior. | Candidato fuerte para histórico multi-mercado económico; el free es insuficiente. Verificar composición de fuentes y derechos de uso para tres usuarios. |
| Twelve Data | Basic $0: 8 créditos/min y 800/día. Grow desde $29/mes; más créditos y mercados en tiers superiores. | Basic incluye US equities/ETF, FX y cripto en tiempo real; Grow anuncia EOD global equities/ETF; Pro incluye datos europeos en tiempo real. | Buen candidato para prueba de API y comparación; cobertura de Europa en tiempo real parece exigir tier superior y add-ons/licencias. |
| FMP | Basic $0: 250 llamadas/día; Starter $19/mes facturado anual; Premium $49; Ultimate $99. | Free EOD y referencia; Starter declara US, histórico y noticias; Premium amplía histórico e intradía; Global coverage en Ultimate. | Muy interesante para prototipo de fundamentals, pero cobertura geográfica completa y display requieren comprobarse. |
| Massive (antes Polygon) | Stocks Basic $0: 5 llamadas/min, EOD, dos años y 100% market coverage; Starter $29/mes, 15 min delayed; tiers superiores $79/$199. | Planes por clase de activo; APIs de agregados, snapshots y WebSocket según tier. La página de stocks no equivale a cobertura europea global. | Buen candidato para histórico/mercado USA; no asumir que el plan individual permite compartir datos. |
| Alpaca | Basic gratis; Algo Trader Plus $99/mes. | Acciones/ETF USA; free usa IEX, paid SIP consolidado; historial desde 2016; free limita historial reciente a últimos 15 minutos según tabla de documentación. | Feed gratuito no representa todo el volumen consolidado. No resuelve Europa ni cripto global por sí solo. |
| Finnhub | Plan y límites deben confirmarse en pricing actual y cuenta. | APIs de candles, quote, news, filings, earnings, ETF y crypto; algunas noticias/funciones tienen restricciones geográficas (p. ej. company-news documentado para Norteamérica en OpenAPI consultado). | Candidato de amplitud funcional; no aprobar sin verificar cuotas y endpoints exactos en documentación oficial. |
| Alpha Vantage | 25 solicitudes/día gratis; proyectos open-source/educativos verificados pueden tener excepción. | Amplia API; real-time y 15-min delayed US equity data son premium por regulación/licencia de mercado. | Útil para pruebas pequeñas, insuficiente como ingesta amplia gratuita. |
| Stooq | Condiciones comerciales/API y límites por validar. | Fuente candidata para histórico, no asumir cobertura/latencia ni SLA. | Sólo benchmark experimental hasta comprobar términos y consistencia. |

### Documentación oficial consultada
- EODHD: https://eodhd.com/pricing ; https://eodhd.com/help/plans ; https://eodhd.com/financial-apis/api-for-historical-data-and-volumes ; https://eodhd.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours
- Twelve Data: https://twelvedata.com/pricing ; https://twelvedata.com/docs
- FMP: https://site.financialmodelingprep.com/pricing-plans ; https://site.financialmodelingprep.com/developer/docs
- Massive: https://massive.com/pricing ; https://massive.com/docs/rest/stocks/overview
- Alpaca: https://docs.alpaca.markets/docs/about-market-data-api
- Alpha Vantage: https://www.alphavantage.co/support/
- Finnhub: https://finnhub.io/docs/api
- Stooq: https://stooq.com/

## 3. Licencias: bloqueo crítico para tres usuarios
- EODHD define uso personal como una persona y prohíbe compartir cuenta/API key o mostrar datos a otras personas bajo plan personal. Para varios usuarios/app/dashboard debe solicitarse licencia comercial y describir salidas derivadas.
- Twelve Data diferencia planes individuales y Business. Los individuales no permiten redistribución; display externo y derechos de redistribución requieren tier/add-on/acuerdo. Los derivados deben ser no reversibles.
- Massive: planes individuales son para uso personal, no comercial; redistribución/display a usuarios requiere licencia comercial.
- FMP: términos prohíben redistribuir, mostrar o proporcionar datos y outputs que contengan una parte sustancial de los datos sin autorización expresa.
- Alpaca: verificar por separado feed, tipo de cuenta, exchange subscriber status y derechos de display.
- SEC EDGAR: datos de filings públicos con política de acceso justo; citar la fuente y respetar User-Agent y límites.

La audiencia de tres usuarios hace que una suscripción individual no pueda darse por válida. Solicitar confirmación escrita del uso: grupo privado de tres personas, dashboard autenticado, señales y/o cotizaciones visibles, persistencia, Telegram/email y outputs derivados.

## 4. Noticias y eventos

| Fuente | Acceso / límites publicados | Uso previsto y cautelas |
|---|---|---|
| Marketaux | Free: 100 requests/día, 3 artículos por petición; Basic $24/mes (mensual) o $29 listado según modalidad; Standard $49; Pro $99. Global, 80+ mercados, 5.000+ fuentes, 30+ idiomas según proveedor. | Candidato práctico para ingestión y entidades; entrega snippet y enlaces, no asumir texto completo ni derechos de redistribución. |
| Finnhub | Cuotas/planes por confirmar. | General news, company news, press releases; cobertura de company-news documentada como Norteamérica en OpenAPI. |
| FMP | Free 250 llamadas/día; noticias listadas en planes de pago. | Probar endpoint, universo, timestamps y condiciones de uso. |
| GDELT Project | Datasets declarados gratuitos para uso académico, comercial y gubernamental; APIs DOC/GEO/TV disponibles. | Descubrimiento global y señales de contexto; no sustituye fuente primaria. Citar GDELT; comprobar latencia, límites y estabilidad del endpoint concreto. |
| Comunicados IR, reguladores y bolsas | Variable; muchas fuentes primarias son públicas. | Prioridad para confirmar hechos. Respetar condiciones de cada sitio y no scrapear contenido protegido. |

Fuentes oficiales:
- Marketaux: https://www.marketaux.com/pricing ; https://www.marketaux.com/faq
- GDELT: https://www.gdeltproject.org/about.html ; https://www.gdeltproject.org/data.html
- Finnhub: https://finnhub.io/docs/api
- FMP: https://site.financialmodelingprep.com/developer/docs

## 5. Filings y fuentes primarias
- SEC EDGAR APIs: `https://data.sec.gov/submissions/CIK##########.json` y `https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json`. No requieren API key. Incluyen historial de submissions y datos XBRL de filings. Límite publicado: máximo 10 requests/segundo por usuario; declarar User-Agent identificable. Los filings suelen estar disponibles en sec.gov en 1–3 minutos desde timestamp EDGAR, sujeto a variación.
- Europa: estudiar ESMA/ESEF, registros nacionales y páginas de relaciones con inversores por mercado. No se ha validado una API paneuropea gratuita equivalente a SEC EDGAR.
- Bolsas y reguladores: evaluar comunicados, suspensiones, corporate actions y calendarios por jurisdicción.

Fuentes:
https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data
https://www.sec.gov/search-filings/edgar-application-programming-interfaces
https://www.sec.gov/about/developer-resources

## 6. Protocolo de pruebas prácticas
Para cada proveedor, usar mismo conjunto de instrumentos (p. ej. AAPL, MSFT, NVDA, SAP XETRA, ASML Euronext, SAN BME; ETF USA/EU y BTC/USD, ETH/USD) y mismos intervalos temporales.
1. Resolver símbolos y bolsa/MIC; detectar cobertura real.
2. Consultar EOD de 5 años, intradía de 1 minuto y quote/snapshot.
3. Registrar timestamp de mercado, timestamp de respuesta, latencia, timezone y retraso declarado.
4. Comparar OHLCV con fuente de referencia; investigar discrepancias y ajustes corporativos.
5. Probar activos deslistados, cambios de ticker, splits y dividendos.
6. Medir llamadas consumidas y créditos por endpoint/símbolo.
7. Probar news search, filtros por entidad/idioma, duplicados, timestamps, enlaces y snippets.
8. Verificar persistencia/caché y uso en LLM bajo términos del proveedor.
9. Pedir por escrito licencia para tres usuarios, display autenticado, alertas, históricos y señales derivadas.
10. Guardar respuestas de prueba (sin secretos), fecha, versión de endpoint y script reproducible.

## 7. Coste estimado: escenarios, no presupuesto
- Prototipo individual de datos diarios: potencialmente 0 €/mes con SEC + GDELT + free tiers, pero límites de llamadas y licencias hacen que no equivalga al producto de tres usuarios.
- Mercado global EOD: EODHD desde $19.99/mes como referencia personal publicada; no asumir que permite compartir.
- Datos intradía multi-mercado: EODHD $29.99/mes personal o Twelve Data Pro desde $99/mes según modalidad/mercados; licencia comercial puede elevar el coste.
- Noticias: Marketaux Free o Basic $24/mes mensual.
- FMP Starter desde $19/mes anual, pero global completo sólo Ultimate $99/mes anual en página consultada.
- Infraestructura, email, hosting, base de datos y licencias comerciales de exchange aún no presupuestados.

**Conclusión provisional:** el coste de API personal no es el coste de un servicio para tres usuarios. No hay todavía un stack que pueda declararse viable y licenciado a 0–30 €/mes.

## 8. Pendientes antes de seleccionar
- Cotizaciones comerciales/licencias para tres usuarios.
- Cobertura europea por bolsa y ETF.
- Frescura real y uso de endpoints intradía.
- Licencia de datos derivados y visualización.
- Retención y backtesting histórico.
- Fuentes de noticias completas y condiciones de reutilización.
- Pruebas con credenciales de prueba y dataset común.
