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


## Fase 1C — ejecutar el harness local de proveedores (pendiente del titular)

**Preparación completada:** se han publicado el script aislado `scripts/validate-providers.mjs`, las instrucciones [docs/PROVIDER_VALIDATION_WINDOWS.md](PROVIDER_VALIDATION_WINDOWS.md), la plantilla `.env.local.example` y las exclusiones de secretos/resultados en `.gitignore`.

- [x] Preparar script Node.js sin dependencias para Windows (Node >= 18).
- [x] Limitar EODHD a 12 peticiones individuales como máximo por ejecución.
- [x] Preparar una única petición agrupada Alpaca para NVDA, MSFT, META, AMZN, JNJ y SPY.
- [x] Limitar la ventana a 7 días naturales, conservar hasta 3 barras por símbolo y no reintentar.
- [x] Registrar cobertura, símbolos, moneda, timestamps, OHLCV, errores y consumo estimado.
- [x] Evitar imprimir/guardar claves y excluir `.env.local` e informes locales de Git.
- [ ] El titular crea/usa sus propias cuentas gratuitas y añade las claves sólo en el archivo local `.env.local`.
- [ ] El titular ejecuta una vez el comando de PowerShell indicado en la guía.
- [ ] El titular adjunta únicamente el JSON de `validation-results/` a ChatGPT.
- [ ] Contrastar consumo estimado EODHD con el contador real y revisar calidad/cobertura.
- [ ] Registrar resultados reales en DATA_SOURCES.md; mantener claramente separadas pruebas ejecutadas e hipótesis documentales.

**Siguiente acción exacta del titular:** descargar/actualizar el repositorio, seguir [la guía Windows](PROVIDER_VALIDATION_WINDOWS.md), ejecutar el script una sola vez y adjuntar el JSON generado. No enviar claves, archivo `.env.local` ni capturas que las muestren.

**Restricciones vigentes:** no contratar, activar pruebas de pago, crear cuentas en nombre del titular, compartir credenciales ni descargar históricos masivos. Esta preparación no selecciona proveedor ni inicia el desarrollo de la aplicación.


## Estado tras primera prueba local — 24-11-2026

- [x] El titular ejecutó el harness y aportó el JSON: EODHD aceptó 12/12 símbolos; Alpaca SIP devolvió HTTP 403 por restricción de suscripción.
- [x] Registrar los resultados observados y sus límites en `docs/DATA_SOURCES.md`.
- [x] Modificar el harness para permitir una ejecución exclusiva de Alpaca con feed IEX mediante `--alpaca-only`, sin llamadas a EODHD.
- [x] Documentar el modo aislado en `docs/PROVIDER_VALIDATION_WINDOWS.md`.
- [ ] El titular ejecuta una vez `node .\\scripts\\validate-providers.mjs --alpaca-only` y aporta el JSON resultante.
- [ ] Contrastar la cuota real consumida en EODHD con su contador; no repetir la prueba EODHD para ello si el panel ya muestra el consumo.
- [ ] Contrastar precios EODHD con una fuente independiente y ampliar después la validación de histórico/ajustes sólo con autorización expresa.

**Siguiente acción exacta:** actualizar el repositorio con `git pull`, ejecutar el comando Alpaca IEX indicado y adjuntar únicamente el JSON nuevo. No ejecutar el modo completo.

---

## Estado tras prueba Alpaca IEX — 24-11-2026

- [x] El titular ejecutó el modo aislado `--alpaca-only` con credenciales disponibles.
- [x] Alpaca Basic con `feed=iex` devolvió 6/6 símbolos USA (NVDA, MSFT, META, AMZN, JNJ y SPY) en una petición agrupada.
- [x] EODHD quedó omitido: 0 llamadas y 0 consumo de cuota en esta ejecución.
- [x] Registrar el resultado y sus límites en `docs/DATA_SOURCES.md`, sección 16.
- [ ] Contrastar el contador real de EODHD con el consumo de la primera ejecución (12 llamadas estimadas); no repetir la prueba para ello.
- [ ] Comparar OHLC/cierres de EODHD y Alpaca IEX en fechas comunes con una tercera fuente independiente; no comparar volúmenes IEX con SIP.
- [ ] Revisar profundidad histórica, ajustes corporativos y huecos, mediante una prueba acotada y autorizada.
- [ ] Cerrar la revisión de licencias y derechos de uso antes de seleccionar proveedor o iniciar integración.

**Decisión provisional:** EODHD sigue siendo candidato para cobertura multi-mercado; Alpaca Basic IEX es candidato complementario para los seis activos USA probados. Ninguno queda aprobado para producción: cobertura de API no equivale a exactitud, continuidad ni licencia de uso.

**Siguiente paso recomendado:** realizar la comparación independiente de precios para los seis símbolos USA usando los datos ya obtenidos, evitando nuevas llamadas EODHD si no son necesarias. Antes de consumir otra cuota, definir exactamente fuente, fechas y número de peticiones.

---

## Estado tras contraste externo de precios — 24-11-2026

- [x] Comparar sin nuevas llamadas API los seis símbolos USA de EODHD y Alpaca IEX contra referencias históricas externas para 19, 20 y 23 de noviembre.
- [x] Confirmar que los 18 cierres EODHD coinciden al céntimo con Yahoo Finance.
- [x] Medir diferencias EODHD/Alpaca IEX: media absoluta aproximada 0,068%; máximo 0,169%.
- [x] Registrar que el volumen IEX no representa volumen consolidado.
- [x] Detectar discrepancia pendiente en `adjustedClose` de JNJ para el 23 de noviembre.
- [x] Aclarar la convención de ajuste de dividendos de EODHD para JNJ: el factor aplicado corresponde al dividendo de 1,34 USD con ex-date 24-11-2026.
- [ ] Definir una prueba acotada de profundidad histórica EODHD (por ejemplo, fechas y número de peticiones explícitos) antes de consumir cuota.
- [ ] Completar revisión de licencia individual, almacenamiento, automatización y uso con LLM antes de seleccionar proveedor.

**Conclusión provisional:** EODHD obtiene una validación externa inicial favorable para los cierres de los seis activos USA en tres sesiones. No es suficiente para aprobar proveedor ni backtesting; Yahoo puede compartir upstream con EODHD y la semántica de precios ajustados sigue sin resolverse.

**Siguiente paso recomendado:** diseñar una prueba histórica EODHD acotada para medir profundidad, continuidad y consistencia de ajustes en varios activos, con símbolos, fechas y consumo máximo definidos antes de ejecutarla.



## Próximo paso — muestra histórica EODHD (24-11-2026)

- [x] Definir cuatro instrumentos representativos: NVDA.US, ASML.AS, VWCE.XETRA y BTC-USD.CC.
- [x] Preparar modo aislado `--history-sample`: ventana 2025-11-24 a 2026-11-24, cuatro peticiones exactas, sin Alpaca, reintentos ni paginación.
- [x] Documentar el comando y el límite de cuota en `docs/PROVIDER_VALIDATION_WINDOWS.md`.
- [ ] El titular comprueba que el contador EODHD permite al menos cuatro llamadas adicionales y ejecuta una sola vez `node .\scripts\validate-providers.mjs --history-sample`.
- [ ] El titular adjunta sólo el JSON de resultados; nunca `.env.local` ni claves.
- [ ] Analizar barras devueltas, primera/última fecha, continuidad, huecos y ajustes; registrar conclusiones en DATA_SOURCES.md.

**Siguiente acción exacta:** tras `git pull`, revisar el contador de EODHD y ejecutar el comando anterior una vez. No ejecutar otros modos del script ese día para evitar consumo accidental.


---

## Estado tras muestra histórica EODHD — 24-11-2026

- [x] Ejecutar la muestra histórica de exactamente cuatro peticiones EODHD para NVDA.US, ASML.AS, VWCE.XETRA y BTC-USD.CC (2025-11-24 a 2026-11-24).
- [x] Analizar cobertura: 1.125 barras en total; 251 NVDA, 255 ASML, 253 VWCE y 366 BTC.
- [x] Comprobar estructura: cuatro símbolos aceptados, fechas ordenadas y sin duplicados, OHLC coherente y volúmenes positivos.
- [x] Registrar consumo estimado: 4 unidades EODHD; Alpaca omitido, 0 peticiones.
- [x] Registrar la conclusión provisional en DATA_SOURCES.md y DECISIONS.md.
- [ ] Contrastar con fuente independiente los movimientos extremos sincronizados del 20-11 y 23-11, sin nuevas llamadas EODHD.
- [ ] Revisar eventos corporativos y metodología de `adjustedClose` de NVDA y ASML.
- [ ] Completar la revisión de licencia individual: automatización, almacenamiento/backtesting, outputs derivados, Telegram/email y uso con LLM.
- [ ] Validar cobertura y calidad del resto de los 12 instrumentos antes de decidir proveedor.

**Decisión vigente:** EODHD supera provisionalmente esta muestra técnica, pero no está aprobado para producción ni backtesting. No realizar más llamadas API ni consumir cuotas hasta definir y autorizar una prueba concreta.

**Siguiente paso recomendado:** contrastar los movimientos extremos del 20 y 23 de noviembre con una fuente independiente, reutilizando el JSON ya obtenido y sin consumir cuota EODHD.
