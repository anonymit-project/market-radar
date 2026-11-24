# Architecture

## 1. Principios
Separar adquisición de datos, normalización, interpretación de eventos, análisis cuantitativo, decisión determinista, persistencia y presentación. Toda señal debe ser reproducible con los datos disponibles en su instante de emisión. Diseñar para abstención y trazabilidad.

## 2. Componentes lógicos
1. Market Data Ingestion.
2. News & Filings Ingestion.
3. Normalization & Entity Resolution.
4. Event Intelligence Engine.
5. Quantitative Engine.
6. Signal Engine.
7. Immutable Signal Ledger.
8. Evaluation & Backtesting.
9. API y persistencia.
10. PWA Dashboard.
11. Telegram Notifications.
12. Email Reports.
13. Scheduler y observabilidad.

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
Objetivo deseado: 15–30 minutos y alertas por eventos. No asumir que puede lograrse gratis. Estrategia a probar:
- Escaneo amplio diario.
- Shortlist intradía.
- Vigilancia más frecuente sólo de señales activas y eventos relevantes.
- Respetar ventanas de mercado, cuotas y prioridad por relevancia.

No consultar todo el universo cada 15 minutos sin estimación de llamadas y coste.

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
