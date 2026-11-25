#!/usr/bin/env python3
"""Local, read-only structural inspection of a Nasdaq Nordic CSV.

Uses only Python's standard library. It never prints trade rows or prices,
never modifies the input file, and performs no network access.
"""
import argparse
import csv
import datetime as dt
import os
import re
import sys
from collections import Counter

DATE_HINTS = ("date", "time", "timestamp", "datetime", "tradetime", "execution")
PRICE_HINTS = ("price", "prc", "rate")
QTY_HINTS = ("quantity", "qty", "volume", "size", "amount")
ID_HINTS = ("id", "tradeid", "transactionid", "matchid")
FLAG_HINTS = ("flag", "status", "condition", "type", "action", "message", "event")

def norm(value):
    return re.sub(r"[^a-z0-9]", "", value.lower())

def parse_date(value):
    value = value.strip()
    if not value:
        return None
    candidates = [value, value.replace("Z", "+00:00")]
    for candidate in candidates:
        try:
            return dt.datetime.fromisoformat(candidate)
        except ValueError:
            pass
    for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%Y%m%d",
                "%Y-%m-%d %H:%M:%S.%f", "%Y-%m-%d %H:%M:%S"):
        try:
            return dt.datetime.strptime(value, fmt)
        except ValueError:
            pass
    return None

def classify(values):
    nonempty = [v.strip() for v in values if v and v.strip()]
    if not nonempty:
        return "vacía"
    numeric = 0
    dates = 0
    for value in nonempty[:500]:
        try:
            float(value.replace(",", "."))
            numeric += 1
        except ValueError:
            pass
        if parse_date(value):
            dates += 1
    sample = min(500, len(nonempty))
    if numeric / sample >= 0.95:
        return "numérica"
    if dates / sample >= 0.80:
        return "fecha/hora"
    return "texto/mixta"

def inspect(path):
    encodings = ("utf-8-sig", "utf-8", "cp1252", "latin-1")
    last_error = None
    for encoding in encodings:
        try:
            with open(path, "r", encoding=encoding, newline="") as handle:
                sample = handle.read(65536)
                handle.seek(0)
                try:
                    dialect = csv.Sniffer().sniff(sample, delimiters=",;|\t")
                except csv.Error:
                    dialect = csv.excel
                reader = csv.DictReader(handle, dialect=dialect)
                if not reader.fieldnames:
                    raise ValueError("No se ha encontrado una cabecera CSV.")
                headers = [h.strip() if h else "" for h in reader.fieldnames]
                counts = Counter()
                blanks = Counter()
                distinct = {h: set() for h in headers}
                minima = {}
                maxima = {}
                first_dates = {}
                last_dates = {}
                row_count = 0
                for row in reader:
                    row_count += 1
                    for h in headers:
                        value = (row.get(h) or "").strip()
                        if not value:
                            blanks[h] += 1
                            continue
                        counts[h] += 1
                        if len(distinct[h]) < 10001:
                            distinct[h].add(value)
                        if any(token in norm(h) for token in DATE_HINTS):
                            parsed = parse_date(value)
                            if parsed:
                                first_dates[h] = min(first_dates.get(h, parsed), parsed)
                                last_dates[h] = max(last_dates.get(h, parsed), parsed)
                report = []
                report.append("DIAGNÓSTICO LOCAL DEL CSV NASDAQ NORDIC")
                report.append("=====================================")
                report.append("Fichero: " + os.path.basename(path))
                report.append("Tamaño: " + str(os.path.getsize(path)) + " bytes")
                report.append("Codificación detectada: " + encoding)
                report.append("Separador detectado: " + repr(dialect.delimiter))
                report.append("Filas de datos: " + str(row_count))
                report.append("Columnas: " + str(len(headers)))
                report.append("")
                report.append("ESTRUCTURA DE COLUMNAS")
                report.append("----------------------")
                for h in headers:
                    values = []
                    with open(path, "r", encoding=encoding, newline="") as second:
                        r = csv.DictReader(second, dialect=dialect)
                        for item in r:
                            values.append((item.get(h) or "").strip())
                    nonempty = [v for v in values if v]
                    distinct_count = len(distinct[h])
                    suffix = "+" if distinct_count > 10000 else ""
                    line = (f"- {h!r}: {classify(values)}; "
                            f"vacíos={blanks[h]}; distintos>={distinct_count}{suffix}")
                    if h in first_dates:
                        line += (f"; rango temporal={first_dates[h].isoformat()} "
                                 f"a {last_dates[h].isoformat()}")
                    report.append(line)
                report.append("")
                report.append("CAMPOS CANDIDATOS POR NOMBRE")
                report.append("---------------------------")
                groups = (("Fecha/hora", DATE_HINTS), ("Precio", PRICE_HINTS),
                          ("Cantidad/volumen", QTY_HINTS), ("Identificador", ID_HINTS),
                          ("Flags/estado/tipo", FLAG_HINTS))
                for label, hints in groups:
                    matches = [h for h in headers
                               if any(token in norm(h) for token in hints)]
                    report.append(f"- {label}: " + (", ".join(matches) if matches else "no detectado"))
                report.append("")
                report.append("NOTAS")
                report.append("-----")
                report.append("- No se han mostrado filas de operaciones ni precios.")
                report.append("- Los candidatos se basan solo en nombres; no implican que el campo sea correcto.")
                report.append("- Este diagnóstico no reconstruye OHLCV ni interpreta cancelaciones/enmiendas.")
                return "\n".join(report)
        except (UnicodeError, csv.Error, OSError, ValueError) as exc:
            last_error = exc
    raise RuntimeError(f"No se pudo leer el CSV: {last_error}")

def main():
    parser = argparse.ArgumentParser(description="Inspección estructural local de un CSV Nasdaq Nordic.")
    parser.add_argument("csv_file", help="Ruta al único CSV descargado desde Nasdaq")
    parser.add_argument("--output", default="nasdaq_csv_diagnostic.txt",
                        help="Fichero de informe local (por defecto: nasdaq_csv_diagnostic.txt)")
    args = parser.parse_args()
    result = inspect(args.csv_file)
    with open(args.output, "w", encoding="utf-8") as output:
        output.write(result + "\n")
    print(result)
    print("\nInforme guardado en: " + os.path.abspath(args.output))

if __name__ == "__main__":
    main()
