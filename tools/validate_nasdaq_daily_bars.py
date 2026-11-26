#!/usr/bin/env python3
"""Validate a Nasdaq Nordic daily-bars CSV locally; never prints market values.

Standard library only. No network access. The input file is read-only.
The report contains structural checks and aggregate counts, not prices or rows.
"""
import argparse
import csv
import datetime as dt
import os
import re
import sys
from decimal import Decimal, InvalidOperation

REQUIRED = (
    "date", "opening price", "high price", "low price",
    "closing price", "average price", "total volume", "trades",
)
NUMERIC = (
    "bid", "ask", "opening price", "high price", "low price",
    "closing price", "average price", "total volume", "turnover", "trades",
)

def parse_number(raw):
    """Parse common decimal/thousands conventions without float rounding."""
    value = (raw or "").strip().replace("\u00a0", "").replace(" ", "")
    if not value:
        return None
    if value.startswith("(") and value.endswith(")"):
        value = "-" + value[1:-1]
    if "," in value and "." in value:
        # The last punctuation mark is treated as the decimal separator.
        if value.rfind(",") > value.rfind("."):
            value = value.replace(".", "").replace(",", ".")
        else:
            value = value.replace(",", "")
    elif "," in value:
        # With a semicolon-delimited source, a lone comma is treated as decimal.
        value = value.replace(",", ".")
    try:
        result = Decimal(value)
        return result if result.is_finite() else None
    except InvalidOperation:
        return None

def parse_date(raw):
    value = (raw or "").strip()
    if not value:
        return None
    try:
        return dt.datetime.fromisoformat(value.replace("Z", "+00:00")).date()
    except ValueError:
        pass
    for fmt in ("%d.%m.%Y", "%d/%m/%Y", "%Y%m%d", "%m/%d/%Y"):
        try:
            return dt.datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    return None

def load_csv(path):
    with open(path, "r", encoding="utf-8-sig", newline="") as handle:
        first = handle.readline()
        has_sep = first.lower().startswith("sep=")
        if has_sep:
            delimiter = first[4:].strip()
            if len(delimiter) != 1:
                raise ValueError("Directiva sep= no válida.")
            handle.seek(0)
            next(handle)
        else:
            handle.seek(0)
            sample = handle.read(65536)
            handle.seek(0)
            try:
                delimiter = csv.Sniffer().sniff(sample, delimiters=",;|\t").delimiter
            except csv.Error:
                delimiter = ","
        reader = csv.DictReader(handle, delimiter=delimiter)
        if not reader.fieldnames:
            raise ValueError("No se ha encontrado cabecera.")
        original_headers = [h.strip() if h else "" for h in reader.fieldnames]
        normalized = {h.lower(): h for h in original_headers}
        rows = []
        malformed = 0
        for row in reader:
            if None in row:
                malformed += 1
            rows.append({(k or "").strip().lower(): (v or "").strip()
                         for k, v in row.items() if k is not None})
    return original_headers, normalized, rows, malformed, delimiter, has_sep

def main():
    ap = argparse.ArgumentParser(description="Validación local de barras diarias Nasdaq Nordic.")
    ap.add_argument("csv_file", help="CSV Nokia ya autorizado")
    ap.add_argument("--output", default="nasdaq_daily_bars_validation.txt")
    args = ap.parse_args()

    headers, header_map, rows, malformed, delimiter, has_sep = load_csv(args.csv_file)
    missing = [name for name in REQUIRED if name not in header_map]
    report = [
        "VALIDACIÓN LOCAL DE BARRAS DIARIAS NASDAQ NORDIC",
        "================================================",
        "Fichero: " + os.path.basename(args.csv_file),
        "Tamaño: " + str(os.path.getsize(args.csv_file)) + " bytes",
        "Separador: " + repr(delimiter),
        "Directiva sep= inicial: " + ("sí" if has_sep else "no"),
        "Filas: " + str(len(rows)),
        "Columnas: " + str(len(headers)),
        "Columnas detectadas: " + ", ".join(headers),
        "Campos obligatorios ausentes: " + (", ".join(missing) if missing else "ninguno"),
        "Filas con columnas sobrantes: " + str(malformed),
        "",
        "CONTROLES",
        "---------",
    ]
    if missing:
        report.append("Validación OHLCV: NO EJECUTADA (faltan campos obligatorios)")
        report.append("Campos numéricos: NO EVALUADOS")
    else:
        parsed = []
        invalid = {name: 0 for name in NUMERIC}
        blanks = {name: 0 for name in NUMERIC}
        date_invalid = 0
        dates = []
        for row in rows:
            record = {}
            day = parse_date(row.get("date"))
            if day is None:
                date_invalid += 1
            else:
                dates.append(day)
            record["date"] = day
            for name in NUMERIC:
                raw = row.get(name)
                if raw is None or raw == "":
                    blanks[name] += 1
                    record[name] = None
                else:
                    number = parse_number(raw)
                    if number is None:
                        invalid[name] += 1
                    record[name] = number
            parsed.append(record)

        checks = {
            "OHLC: High >= max(Open, Close) y Low <= min(Open, Close)": 0,
            "OHLC: High >= Low": 0,
            "Average price dentro de [Low, High]": 0,
            "Bid <= Ask": 0,
            "Volumen negativo": 0,
            "Trades negativo o no entero": 0,
            "Precio OHLC no positivo": 0,
            "Volumen cero con operaciones > 0": 0,
        }
        for r in parsed:
            o, h, l, c, avg = (r.get(k) for k in
                               ("opening price", "high price", "low price",
                                "closing price", "average price"))
            if all(v is not None for v in (o, h, l, c)):
                if h < max(o, c) or l > min(o, c):
                    checks["OHLC: High >= max(Open, Close) y Low <= min(Open, Close)"] += 1
                if h < l:
                    checks["OHLC: High >= Low"] += 1
            if avg is not None and h is not None and l is not None and not (l <= avg <= h):
                checks["Average price dentro de [Low, High]"] += 1
            bid, ask = r.get("bid"), r.get("ask")
            if bid is not None and ask is not None and bid > ask:
                checks["Bid <= Ask"] += 1
            vol, trades = r.get("total volume"), r.get("trades")
            if vol is not None and vol < 0:
                checks["Volumen negativo"] += 1
            if trades is not None and (trades < 0 or trades != trades.to_integral_value()):
                checks["Trades negativo o no entero"] += 1
            if any(v is not None and v <= 0 for v in (o, h, l, c)):
                checks["Precio OHLC no positivo"] += 1
            if vol == 0 and trades is not None and trades > 0:
                checks["Volumen cero con operaciones > 0"] += 1

        duplicate_dates = len(dates) - len(set(dates))
        ordered = dates == sorted(dates)
        report.append("Fechas ilegibles: " + str(date_invalid))
        report.append("Fechas duplicadas: " + str(duplicate_dates))
        report.append("Fechas en orden ascendente: " + ("sí" if ordered else "no"))
        if dates:
            report.append("Rango de fechas: " + min(dates).isoformat() + " a " + max(dates).isoformat())
            report.append("Días naturales entre primera y última fecha: " +
                          str((max(dates) - min(dates)).days))
        report.append("")
        report.append("Campos numéricos ilegibles / vacíos:")
        for name in NUMERIC:
            if name in header_map:
                report.append(f"- {header_map[name]}: ilegibles={invalid[name]}; vacíos={blanks[name]}")
        report.append("")
        for label, count in checks.items():
            report.append(f"- {label}: anomalías={count}")
        missing_required = sum(blanks.get(name, 0) for name in
                               ("opening price", "high price", "low price",
                                "closing price", "average price", "total volume", "trades"))
        report.append("Campos numéricos obligatorios vacíos: " + str(missing_required))
        critical = (date_invalid + duplicate_dates + malformed +
                    sum(invalid.values()) + missing_required +
                    checks["OHLC: High >= max(Open, Close) y Low <= min(Open, Close)"] +
                    checks["OHLC: High >= Low"] +
                    checks["Volumen negativo"] +
                    checks["Trades negativo o no entero"] +
                    checks["Precio OHLC no positivo"])
        report.append("")
        report.append("Resultado estructural: " +
                      ("SIN ANOMALÍAS CRÍTICAS DETECTADAS" if critical == 0
                       else "REVISIÓN NECESARIA"))
        report.append("Nota: no se infieren sesiones ausentes sólo por huecos de días naturales.")
        report.append("Nota: no se puede confirmar moneda, unidad de volumen ni cobertura consolidada con este CSV.")
        report.append("Nota: el rango OHLC y la coherencia aritmética no demuestran completitud ni derechos de retención.")

    report.extend([
        "",
        "LIMITACIONES",
        "------------",
        "- No se muestran precios, volúmenes, turnover ni filas individuales.",
        "- No se reconstruyen operaciones ni se interpretan cancelaciones/enmiendas.",
        "- No se valida contra una fuente externa ni se demuestra cobertura total del mercado.",
        "- Total volume y Trades se evalúan como campos declarados por el fichero; su semántica requiere documentación oficial.",
    ])
    output = "\n".join(report) + "\n"
    with open(args.output, "w", encoding="utf-8") as handle:
        handle.write(output)
    print(output)
    print("Informe guardado en: " + os.path.abspath(args.output))

if __name__ == "__main__":
    try:
        main()
    except (OSError, UnicodeError, csv.Error, ValueError) as exc:
        print("ERROR: " + str(exc), file=sys.stderr)
        sys.exit(1)
