# Next Steps

## Fase 0 — Documentación y control de contexto
- [x] Consolidar alcance, principios, arquitectura lógica y pendientes.
- [x] Publicar documentación inicial en GitHub.
- [x] Definir GitHub como fuente persistente de contexto y relevo entre chats.
- [x] Formalizar protocolo de trabajo y cierre obligatorio de cada chat en docs/WORKFLOW.md.
- [x] Referenciar el protocolo desde README.md y DECISIONS.md.
- [ ] Mantener DECISIONS.md actualizado tras cada decisión.

## Fase 1 — Validación de fuentes de datos (actual)
1. Crear una matriz por activo/bolsa/endpoint para EODHD, Twelve Data, FMP, Massive, Alpaca, Finnhub, Alpha Vantage, Stooq y fuentes primarias.
2. Verificar documentación oficial, planes, cuotas, histórico, frescura y cobertura.
3. Analizar licencias de uso personal del titular, automatización, almacenamiento, derivados, alertas y uso con IA.
4. Documentar cláusulas ambiguas; sólo solicitar aclaraciones no comerciales/materiales si no pueden resolverse con fuentes oficiales, sin enviar consultas sin autorización.
5. Ejecutar pruebas reproducibles con un conjunto común de símbolos USA/EU/ETF/cripto, sólo tras autorización para consumir cuotas o usar credenciales.
6. Comparar calidad OHLCV, ajustes, latencia, huecos, símbolos deslistados y news metadata.
7. Elaborar coste mensual realista con frecuencia y universo definidos.
**Entregable:** matriz de resultados, scripts de prueba, evidencias, riesgos y recomendación respaldada. Objetivo de coste cero; sin contratación.

## Fase 2 — Viabilidad de Event Intelligence
- Seleccionar fuentes autorizadas y flujo de fuentes primarias.
- Evaluar LLMs gratuitos/de bajo coste, costes por evento y límites.
- Definir JSON Schema, taxonomía, deduplicación y resolución de entidades.
- Crear conjunto de evaluación etiquetado y medir precisión/calibración.
- Diseñar grafo de relaciones con evidencia y validez temporal.
**Entregable:** prototipo aislado y evaluación cuantitativa, sin motor de trading.

## Fase 3 — Arquitectura respaldada por pruebas
- Comparar scheduler, base de datos, hosting, PWA, Telegram y email.
- Estimar cuotas, coste, disponibilidad, backups, seguridad y mantenimiento.
- Definir modelo de datos, contratos API y observabilidad.
**Entregable:** ADR/arquitectura aprobada con costes y límites demostrados.

## Fase 4 — Motor cuantitativo y ledger
- Definir estrategias explícitas y reglas deterministas.
- Implementar versionado, abstención, precios ejecutables y registro inmutable.
- Crear backtesting point-in-time sin sesgos.
**Entregable:** resultados reproducibles y revisión crítica.

## Fase 5 — Paper trading
- Ejecutar señales sin órdenes reales.
- Medir ejecución teórica realista, calidad, precisión, rentabilidad y drawdown.
- Mantener fallos visibles y reglas congeladas por periodo.
**Entregable:** informe de validación y decisión de continuar/no continuar.

## Fase 6 — Dashboard y notificaciones
Sólo tras validar fases anteriores: PWA privada para un usuario, histórico, estadísticas, cartera virtual individual (si se mantiene), Telegram y email.

## Condiciones de avance
No saltar de fase por entusiasmo. Cada fase debe terminar con evidencias, decisiones, costes y riesgos. No contratar ni publicar datos a usuarios hasta confirmar licencias.


## Regla de continuidad
Al finalizar cada chat, indicar siempre el siguiente paso del usuario:
- Si la tarea puede continuar de forma eficiente en el mismo chat, cerrar con una pregunta concreta que desbloquee el siguiente paso.
- Si conviene un chat nuevo, entregar un prompt de relevo completo, listo para copiar y pegar.
Nunca cerrar con un «¿cómo seguimos?» genérico ni dejar el siguiente paso implícito.


## Fase 1B — Validación de proveedores para un único usuario (alcance vigente)

**Alcance:** uso privado del titular, sin compartir datos ni resultados con familiares o terceros.

- [x] Sustituir el requisito de tres usuarios por uso individual.
- [x] Mantener la auditoría anterior como histórico, sin usarla como requisito de selección.
- [ ] Reevaluar EODHD, Twelve Data, FMP, Massive, Alpaca, Finnhub, Alpha Vantage y Stooq bajo licencias personales/individuales.
- [ ] Para cada proveedor, verificar expresamente: dashboard privado del titular; API/automatización; almacenamiento local y caché; histórico y backtesting; indicadores/señales no compartidos; alertas Telegram/email al titular; procesamiento por LLM; retención y borrado al cancelar; derechos de exchange.
- [ ] Verificar fuentes de noticias: GDELT como candidato de metadatos con atribución; Marketaux y APIs de noticias según licencia individual.
- [ ] Consultar por escrito sólo los puntos materiales que no queden resueltos en términos/documentación oficial, previa autorización del usuario. No enviar las antiguas consultas de licencias multiusuario.
- [ ] Comparar cobertura USA/EU/ETF/cripto, granularidad, latencia, histórico, cuotas y coste para el universo y frecuencia previstos.
- [ ] Priorizar opciones gratuitas; no estudiar ni contratar planes de pago hasta que el sistema gratuito funcione y se hayan medido sus limitaciones.
- [ ] No ejecutar pruebas API, consumir cuotas ni usar credenciales hasta autorización expresa.

**Criterio de salida:** shortlist de proveedor(es) cuyo uso individual cubra el caso real, con restricciones, coste, fuentes subyacentes y evidencia oficial documentados. Ningún proveedor queda aprobado hasta terminar esa evaluación. No iniciar desarrollo antes.

**Estado actualizado:** el universo de 12 instrumentos y la frecuencia EOD diaria están definidos; la matriz documental de cobertura y consumo está en DATA_SOURCES.md, sección 13. El siguiente paso es una prueba técnica limitada, sólo después de autorización expresa.

## Regla de continuidad
Al finalizar cada chat, indicar siempre el siguiente paso del usuario:
- Si la tarea puede continuar de forma eficiente en el mismo chat, cerrar con una pregunta concreta que desbloquee el siguiente paso.
- Si conviene un chat nuevo, entregar un prompt de relevo completo, listo para copiar y pegar.
Nunca cerrar con un «¿cómo seguimos?» genérico ni dejar el siguiente paso implícito.


## Próximo paso — validar universo y cuotas gratuitas
- [x] Definir un universo de 12 instrumentos con sustitución de CNR por JNJ para incorporar salud.
- [x] Construir matriz documental preliminar de cobertura, endpoints, profundidad histórica y consumo EOD por proveedor (DATA_SOURCES.md, sección 13).
- [x] Evaluar GDELT + fuentes primarias para una segunda ejecución selectiva, sin volver a descargar precios.
- [ ] Confirmar mediante prueba los símbolos/MIC, cobertura real y moneda de los 12 instrumentos; los símbolos de referencia no equivalen a validación de endpoint.
- [ ] Diseñar y probar el comportamiento de abstención ante datos ausentes, retrasados, desajustados o discrepantes.
- [ ] Obtener autorización expresa antes de ejecutar llamadas API con cuotas gratuitas o usar credenciales personales.


## Próximo paso — prueba técnica limitada de cobertura

La investigación documental apunta a EODHD Free como primer candidato (12 llamadas teóricas para 12 símbolos, sobre 20 diarias), con Alpaca Basic para contraste de acciones/ETF USA y FMP o Alpha Vantage como contraste alternativo. Esta hipótesis no equivale a proveedor aprobado.

**Bloqueo:** no ejecutar llamadas API, crear cuentas, utilizar credenciales ni consumir cuotas sin autorización expresa del usuario. Tras recibirla, realizar una prueba acotada, registrar endpoints, símbolos exactos, respuestas, errores, timestamps, ajustes, histórico y consumo real, y comparar resultados sin activar planes de pago.


## Estado de autorización de pruebas — 24-11-2026
- [x] El usuario ha autorizado pruebas limitadas con cuotas gratuitas.
- [x] Confirmado que EODHD demo sólo cubre una lista de símbolos de ejemplo; permite como máximo contrastar AMZN y BTC del universo.
- [x] Confirmado que Alpaca ofrece histórico cripto sin autenticación, pero requiere API key/secret para acciones.
- [ ] Preparar harness técnico aislado (no aplicación) para 1–3 barras por activo, resolución de símbolos, moneda, timestamps y consumo.
- [ ] Obtener credenciales gratuitas aportadas/creadas por el titular, almacenadas localmente o como secretos de GitHub Actions; nunca compartirlas en el chat o en el repositorio.
- [ ] Ejecutar pruebas desde un entorno con conectividad, empezando por EODHD y Alpaca.
- [ ] Registrar resultados reales, errores y cuotas consumidas en DATA_SOURCES.md.
- **Restricciones:** sin planes de pago, pruebas de pago, creación de cuentas en nombre del usuario ni descargas históricas masivas.
