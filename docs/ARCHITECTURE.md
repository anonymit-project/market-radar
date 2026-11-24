# Architecture

## 1. Principios
Separar adquisición de datos, normalización, interpretación de eventos, análisis cuantitativo, decisión determinista, persistencia y presentación. Toda señal debe ser reproducible con los datos disponibles en su instante de emisión. Diseñar para abstención y trazabilidad.

## 2. Componentes lógicos
1. Universe Discovery e Instrument Master.
2. Market Data Ingestion (adaptadores por proveedor y mercado).
3. Fundamentals & Filings Ingestion.
4. News & Corporate Events Ingestion.
5. Normalization, Entity Resolution y Data Quality.
6. Screening / Feature Engine.
7. Candidate Ranking.
8. Deep Analyst para candidatos.
9. Signal Engine determinista y abstención.
10. Immutable Signal Ledger.
11. Evaluation & Backtesting.
12. Persistencia, scheduler y observabilidad.
13. Presentación y notificaciones, sólo después de validar fuentes y arquitectura.

## 3. Flujo
Fuentes → ingesta → normalización → datos de mercado y eventos → análisis cuantitativo → reglas deterministas → ledger inmutable → dashboard/notificaciones → evaluación posterior.

## 4. Arquitectura cloud candidata (no aprobada)
- Scheduler gestionado: GitHub Actions u otra alternativa.
- Persistencia: Supabase/Postgres u otro Postgres gestionado.
- Frontend: PWA estática.
- Telegram Bot API.
- Email gratuito o SMTP autorizado.

No fijar proveedor antes de comprobar cuotas, suspensión por inactividad, cron, límites de ejecución, almacenamiento, backups, observabilidad y coste real.

## 5. Frecuencia objetivo
- Primera versión: escaneo EOD diario después del cierre correspondiente de cada mercado.
- Segunda comprobación opcional sólo para eventos/noticias materiales; no volver a descargar todas las series de precios.
- Sin intradía ni WebSockets.
- Respetar calendarios, festivos, zonas horarias y retrasos publicados.
- Objetivo de 1–2 resúmenes/alertas al día como máximo, sólo si hay cambios relevantes.
- No consultar todo el universo con mayor frecuencia sin justificar cuotas, coste y licencias.

## 6. Persistencia y trazabilidad
Guardar datos fuente con proveedor, endpoint, hora de adquisición, hora de publicación/observación, zona horaria, licencia/retención aplicable y checksum o referencia estable. Separar datos brutos, normalizados, eventos, relaciones, señales y resultados de evaluación. No actualizar retrospectivamente la evidencia original de una señal.

## 7. Riesgos técnicos
- Retrasos o ejecuciones perdidas del scheduler.
- Suspensión/limitaciones de servicios gratuitos.
- Límites de APIs, cuotas por endpoint y costes por símbolo.
- Diferencias de calendario, divisa, splits y dividendos.
- Identificadores/tickers ambiguos y cambios corporativos.
- Secretos expuestos en logs o repositorio.
- Retención y redistribución no autorizadas.
- Datos corregidos posteriormente que introduzcan look-ahead bias.
- Ingesta duplicada, retrasada o incompleta.
- Dependencia de un solo proveedor.

## 8. Decisiones pendientes
Scheduler, base de datos, hosting, proveedor de mercado, noticias, autenticación, email, observabilidad, política de retención y licencias. No implementar antes de superar pruebas de fuentes y un diseño respaldado por costes y restricciones documentadas.


## 9. Explorador de acciones (diseño propuesto)

El diseño detallado se mantiene en [docs/EXPLORER_DESIGN.md](EXPLORER_DESIGN.md). El explorador debe separar catálogo de instrumentos, precios, fundamentales, noticias y eventos. El ticker no será clave primaria: se normalizarán emisor, clase de acción, ISIN, FIGI, LEI/CIK, MIC, moneda y vigencia de cada símbolo.

Pipeline: descubrimiento de universo → elegibilidad y deduplicación → validación de datos → filtros de liquidez → features cuantitativas → catalizadores/eventos → ranking explicable → análisis profundo de candidatos. El LLM no decide señales ni altera puntuaciones deterministas.

**Bloqueo vigente:** no se ha identificado una fuente gratuita paneuropea de OHLCV EOD que combine cobertura amplia, automatización, almacenamiento histórico y derechos claros. No iniciar desarrollo del escáner amplio hasta resolverlo. Massive es sólo candidato técnico USA y no proveedor aprobado.
