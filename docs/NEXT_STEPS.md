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
- [x] Definir y ejecutar una prueba acotada de profundidad histórica EODHD: cuatro peticiones para cuatro instrumentos.
- [ ] Completar revisión de licencia individual, almacenamiento, automatización y uso con LLM antes de seleccionar proveedor.

**Conclusión provisional:** EODHD obtiene una validación externa inicial favorable para los cierres de los seis activos USA en tres sesiones. No es suficiente para aprobar proveedor ni backtesting; Yahoo puede compartir upstream con EODHD y la semántica de precios ajustados sigue sin resolverse.

**Siguiente paso recomendado:** contrastar los movimientos extremos observados en la muestra histórica y revisar los ajustes corporativos, sin consumir más cuota EODHD.



## Próximo paso — muestra histórica EODHD (24-11-2026)

- [x] Definir cuatro instrumentos representativos: NVDA.US, ASML.AS, VWCE.XETRA y BTC-USD.CC.
- [x] Preparar modo aislado `--history-sample`: ventana 2025-11-24 a 2026-11-24, cuatro peticiones exactas, sin Alpaca, reintentos ni paginación.
- [x] Documentar el comando y el límite de cuota en `docs/PROVIDER_VALIDATION_WINDOWS.md`.
- [x] El titular comprueba que el contador EODHD permite al menos cuatro llamadas adicionales y ejecuta una sola vez `node .\scripts\validate-providers.mjs --history-sample`. (ejecutado una sola vez).
- [x] El titular adjunta sólo el JSON de resultados; nunca `.env.local` ni claves.
- [x] Analizar barras devueltas, primera/última fecha, continuidad, huecos y ajustes; registrar conclusiones en DATA_SOURCES.md.

**Estado:** prueba ejecutada y analizada; resultados documentados en DATA_SOURCES.md, sección 17. No repetir la consulta ni consumir más cuota para esta validación.


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


---

## Fase 1D — Diseño y viabilidad del Explorador de acciones (24-11-2026)

**Diseño documental inicial completado:** [docs/EXPLORER_DESIGN.md](EXPLORER_DESIGN.md).

- [x] Separar acciones USA/EU del seguimiento de ETF y criptomonedas.
- [x] Proponer mercados iniciales por fases: Nasdaq/NYSE/NYSE American; Xetra, Euronext, BME y LSE.
- [x] Identificar fuentes de catálogo: Nasdaq Trader, ESMA FIRDS, directorios de bolsas, Massive All Tickers, OpenFIGI y GLEIF.
- [x] Evaluar fuentes de precios, fundamentales, noticias y eventos por separado.
- [x] Diseñar master de instrumentos independiente del ticker y pipeline de filtrado/ranking.
- [x] Proponer arquitectura desacoplada y criterios de calidad/abstención.
- [ ] Resolver una fuente paneuropea gratuita de OHLCV EOD que permita automatización y almacenamiento histórico con derechos claros.
- [ ] Confirmar elegibilidad y términos de Massive para uso personal/non-professional antes de considerarlo para USA.
- [ ] Definir umbrales de liquidez por mercado y tratamiento de ADR, small caps y clases múltiples.
- [ ] Validar el coste operativo de ingesta/normalización de ESMA FIRDS y directorios de bolsas.
- [ ] Diseñar un conjunto mínimo de fundamentales homogéneos USA/EU para análisis de candidatos.
- [ ] Sólo tras cerrar las cuestiones anteriores, proponer pruebas API acotadas y solicitar autorización expresa antes de consumir cuotas.

**Bloqueo principal:** no iniciar desarrollo del escáner amplio mientras no haya cobertura de precios EOD europea automatizable y licenciada. No repetir las pruebas históricas EODHD ni consumir cuotas en esta fase documental.

**Siguiente paso recomendado:** continuar investigación documental del mercado de datos EOD europeo y sus licencias, sin llamadas API ni credenciales.


---

## Fase 1E — Fuentes públicas europeas post-trade (24-11-2026)

**Hallazgo:** existen ficheros públicos automatizables de transparencia post-trade bajo MiFIR. No equivalen automáticamente a OHLCV consolidado, pero abren una vía viable por venue.

- [x] Revisar Reglamento Delegado (UE) 2025/1156, artículos 23–25.
- [x] Identificar Euronext Trades Files, Xetra delayed post-trade, Cboe Europe, BME APA y LSEG delayed transparency.
- [x] Revisar EuroCTP: consolidado paneuropeo operativo, pero Non-Display Use sujeto a licencia; coste publicado no viable para el uso automático privado.
- [x] Revisar alternativas Stooq, Alpha Vantage, Twelve Data, OHLC.io y Yahoo.
- [ ] Confirmar términos de Deutsche Börse para automatización privada y retención.
- [ ] Analizar esquema y flags completos de Euronext (correcciones, cancelaciones, deferrals, subastas y volumen).
- [ ] Determinar el alcance real de los ficheros Cboe/BME por venue/APA y su integridad.
- [ ] Definir si las barras de venue son suficientes para el primer screening y cómo se etiquetará la cobertura.
- [ ] Proponer fuente complementaria para mercados europeos sin feed gratuito apto.
- [ ] Sólo después, solicitar autorización para una prueba técnica pequeña, acotada y sin consumo de APIs comerciales.

**Siguiente paso recomendado:** análisis documental detallado del formato de Euronext y de la política de uso Xetra. No descargar ficheros, no llamar APIs y no consumir cuotas sin autorización.


## Actualización 24-11-2026 — revisión de términos y formatos

- [x] Revisar términos específicos de Euronext: uso gratuito salvo distribución, pero contradicción con aviso de copyright sobre copia; esquema y retención histórica siguen sin confirmación.
- [x] Revisar política DBAG v2.8: delayed data gratis si no se comercializa, pero non-display/quantitative analysis y almacenamiento pueden requerir encuadre/licencia.
- [x] Revisar especificación Cboe Delayed Transparency Files v1.0.7: campos, MIC, timestamps, cantidades, IDs y flags; feed nuevo reemplaza al legacy con migración anunciada hasta 27-11-2026.
- [x] Revisar BME y LSEG: derechos automatizados no confirmados para BME; LSEG exige licencia para non-display/derived data.
- [ ] Obtener confirmación escrita de Euronext sobre ingesta automática privada, copia técnica, OHLCV derivados internos y retención histórica indefinida.
- [ ] Obtener confirmación escrita de Deutsche Börse sobre uso personal automatizado no-display/quantitative analysis y almacenamiento persistente de datos retrasados.
- [ ] Evaluar con cautela el disclaimer de Cboe («Not for Trading or Investment Decisions») antes de considerarlo para señales de inversión.
- [ ] No descargar datos, ejecutar scripts, registrarse ni enviar consultas sin autorización expresa del usuario.

**Conclusión vigente:** Euronext y Xetra siguen como candidatos prioritarios, pero ninguna fuente europea está aprobada todavía para ingesta automatizada con almacenamiento histórico. Cboe es complemento técnico parcial, no consolidado paneuropeo.


## Actualización 24-11-2026 — criterio de uso privado

- [x] Aclarar que el scraping no es ilegal por definición, pero no existe una exención general por uso privado para bases de datos electrónicas.
- [x] Reinterpretar Euronext: cláusula específica de uso gratuito sin restricciones salvo distribución respalda uso interno y derivados no distribuidos; copia sistemática y retención indefinida siguen con reserva por aviso de copyright y ausencia de cláusula explícita de retención.
- [x] Incorporar DBAG Non-Display Guidance Note V4.0 efectiva 01-08-2026: productos MiFIR con categorías y tarifas por Device Access; Market Radar no encaja en simple analytics por generar análisis técnico/señales.
- [x] Mantener Cboe fuera de señales de inversión por su disclaimer y falta de garantía.
- [ ] Consultar la lista de precios DBAG vigente para productos MiFIR y determinar si existe categoría Non-Display individual asumible; no contactar con proveedores.
- [ ] Diseñar almacenamiento Euronext minimizando raw data y reteniendo preferentemente OHLCV derivados/metadatos propios, sujeto a validación de términos.
- [ ] No enviar correos, descargar ficheros, crear cuentas ni consumir cuotas sin autorización expresa.

**Conclusión:** Euronext pasa a ser candidato razonable para piloto privado basado en uso interno y datos derivados, con reserva sobre retención raw indefinida. Xetra queda bloqueado hasta conocer la licencia non-display aplicable a screening y señales.


## Actualización — precios y licencia Xetra (24-11-2026)

- [x] Revisar la Price List DBAG Non-Display v11_01, vigente 01-08-2026.
- [x] Registrar tarifas Xetra Post-Trade: 480 €/mes Entry, 880 € Medium, 1.400 € Plus y 2.200 € Unlimited, antes de IVA, para la categoría tarifada por Device Access.
- [x] Comprobar que Other Application Usage (categoría que incluye análisis cuantitativo) aparece sin tarifa publicada para Xetra Post-Trade; no asumir que la tarifa Entry cubre screening/señales.
- [x] Confirmar que Market Radar no encaja en «simple analytics» según la FAQ DBAG por generar análisis técnico y señales.
- [x] Decisión: descartar Xetra para screening automatizado salvo nueva licencia pública clara y asumible. No contactar al proveedor.


## Actualización documental — fuentes post-trade europeas (24-11-2026)

- [x] Investigar SIX Swiss Exchange, Nasdaq Nordic/Baltic, LSE/UK venues, BME y otros mercados europeos con documentación oficial.
- [x] Identificar NGM como fuente adicional de post-trade CSV gratuito para uso no comercial.
- [x] Separar fuentes con transacciones aptas potencialmente para OHLCV de fuentes que sólo publican cierre/último precio.
- [x] Documentar arquitectura por adaptadores y barras venue-specific en docs/EUROPEAN_POST_TRADE_RESEARCH_2026-11-24.md.
- [ ] Validar documentalmente esquema y flags de Nasdaq Nordic/Baltic y NGM, sin descargar ficheros.
- [ ] Resolver retención raw y derechos de automatización para cada fuente antes de ingesta recurrente.
- [ ] Mantener BME y LSEG bloqueados hasta que la documentación pública resuelva uso non-display/derived y retención.
- [ ] No descargar muestras, crear cuentas, ejecutar APIs ni consumir cuotas sin autorización expresa posterior.

**Siguiente prioridad:** Euronext como piloto principal; Nasdaq Nordic/Baltic como segundo candidato; NGM tercero. SIX Historical Prices no se utilizará para generar OHLCV. La validación técnica de cualquier feed queda para una fase posterior y acotada, con autorización expresa.


## Actualización 25-11-2026 — Nasdaq Nordic/Baltic y NGM

- [x] Leer documentación vigente y comprobar rama/estado GitHub.
- [x] Revisar documentación oficial pública de Nasdaq Regulatory Reports, Nasdaq MiFID II, Nasdaq NLS v1.2.10, NGM Delayed Market Data, NGM Market Data Policy v1.4 y RTS 1.
- [x] Comparar campos regulatorios, timestamps, ISIN/MIC, precio, cantidad, divisa, transaction ID, MMT, cancelaciones/enmiendas, clases de activos, completitud, OHLCV y retención.
- [x] Registrar limitaciones: no se ha inspeccionado CSV alguno; la especificación NLS no es el esquema CSV gratuito; ninguna fuente acredita retención raw indefinida.
- [x] Recomendación documental: Nasdaq Nordic Equity primero para piloto acotado posterior; Nasdaq Baltic subcandidato por separado; NGM condicionado por ambigüedad de non-display/derived y retención.
- [ ] **Pendiente de autorización expresa:** descargar un único fichero de una sesión Nasdaq Nordic Equity para inspección de esquema/flags. No automatizar ni conservar raw históricamente.
- [ ] Antes de ingesta recurrente, resolver documentalmente derechos de retención raw/derivados y validar integridad/cobertura por MIC.
- [ ] NGM sólo reconsiderar para piloto si la documentación pública aclara el alcance de 7.3/8/9.6 y la retención.

**Restricciones:** no contactar proveedores, crear cuentas, descargar datos, ejecutar APIs, consumir cuotas ni incurrir en costes en esta fase documental.

## Piloto Nasdaq Nordic Equity — diseño completado (25-11-2026)

- [x] Leer documentación vigente y comprobar rama/estado del repositorio.
- [x] Diseñar piloto mínimo de un instrumento, una sesión completa y un único CSV.
- [x] Definir matriz de campos, tratamiento de cancelaciones/enmiendas, flags, OHLCV y controles de completitud.
- [x] Separar ventana de disponibilidad de 48 h de los derechos de retención histórica.
- [ ] **Obtener autorización expresa del usuario** antes de descargar un único CSV.
- [ ] Tras autorización, confirmar que la ruta ofrece un único fichero de sesión completa; si no, detenerse y pedir nueva autorización antes de ampliar el alcance.
- [ ] Inspeccionar el CSV y emitir informe técnico. No guardar raw permanentemente ni incorporarlo a GitHub.
- [ ] Resolver derechos de almacenamiento raw y derivados antes de retención histórica o ingesta recurrente.

**Estado:** sólo diseño documental. Ningún CSV inspeccionado; ninguna descarga/API ejecutada. Detalle: docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md.

## Nasdaq Nordic — autorización recibida, descarga bloqueada por acceso a la interfaz (25-11-2026)

- [x] Autorización expresa recibida para un único CSV, instrumento y sesión.
- [x] Candidato identificado: Nokia Oyj, NOKIA, ISIN FI0009000681, MIC XHEL; sesión candidata 25-11-2026.
- [ ] Obtener el CSV diario individual mediante el botón oficial «Download CSV» de la ficha de instrumento.
- [ ] Inspeccionar el CSV y emitir informe técnico.

La ficha web de Nokia disponible en el navegador devuelve «Data is currently not available» y no expone el enlace de descarga. No se ha descargado nada ni se ha recurrido a APIs o a los ficheros minuto a minuto. Para mantener el alcance aprobado, el usuario puede adjuntar el único CSV diario obtenido desde el botón oficial de Nasdaq. Véase docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md.

## Nasdaq Nordic — autorización ampliada a un único CSV de cinco días (25-11-2026)

- [x] Usuario autoriza un único CSV de cinco días para Nokia Oyj (NOKIA, ISIN FI0009000681, MIC XHEL).
- [ ] Obtener/recibir ese único CSV desde el botón oficial de la ficha de Nokia.
- [ ] Inspeccionar todas las sesiones incluidas y reconstruir OHLCV por sesión.
- [ ] Documentar campos, flags, cancelaciones/enmiendas, integridad y limitaciones.

La interfaz accesible no expone el enlace dinámico de descarga, por lo que no se ha descargado el fichero. El usuario puede adjuntar el CSV de cinco días. No ampliar a otros instrumentos, ficheros, APIs ni endpoints. Detalle: docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md.

### Diagnóstico Nasdaq Nordic ejecutable localmente (25-11-2026)
- [x] Crear script local de inspección estructural sin dependencias ni red: \`tools/inspect_nasdaq_csv.py\`.
- [ ] Usuario ejecuta el script sobre el único CSV autorizado y comparte solo \`nasdaq_csv_diagnostic.txt\`.
- [ ] Adaptar parser al esquema observado; después reconstruir OHLCV por sesión y validar flags, cancelaciones, enmiendas y completitud.

- [x] Corregir el inspector para omitir la directiva inicial \`sep=;\` de Excel; el primer diagnóstico la había interpretado como cabecera.
- [ ] Repetir diagnóstico con la versión corregida y revisar nombres de columnas, tipos y rango temporal.

### Nasdaq Nordic — primer informe inválido por directiva sep= (26-11-2026)
- [x] Recibir informe local del fichero Nokia de 632 bytes.
- [x] Identificar que el inspector antiguo leyó \`sep=;\` como cabecera; las 2 columnas informadas no son el esquema real.
- [x] Corregir el inspector para omitir la directiva inicial.
- [ ] Usuario repite el diagnóstico con la versión corregida; no interpretar aún el fichero ni reconstruir OHLCV.



## Nasdaq Nordic — validar CSV de barras diarias (26-11-2026)

- [x] Recibir el segundo diagnóstico local del único CSV autorizado de Nokia.
- [x] Identificar esquema aparente de seis filas y once campos; hipótesis: barras diarias preagregadas, no trades individuales.
- [x] Añadir `tools/validate_nasdaq_daily_bars.py` para validación local estructural y aritmética sin exponer valores.
- [ ] El usuario descarga/actualiza el script desde la rama de investigación y lo ejecuta sobre el mismo CSV autorizado.
- [ ] El usuario comparte únicamente `nasdaq_daily_bars_validation.txt`; nunca el CSV bruto.
- [ ] Interpretar anomalías y determinar si las barras son internamente coherentes.
- [ ] Investigar documentalmente la semántica oficial de OHLC, Average price, Total volume, Turnover, Trades, Bid y Ask, sin contactar al proveedor.
- [ ] Mantener bloqueada cualquier ingesta recurrente o retención histórica hasta resolver derechos y alcance de cobertura.

**Comando Windows:**

```powershell
python tools/validate_nasdaq_daily_bars.py "C:\Users\crist\Downloads\nokia_20261125_210111.csv"
```

**Restricciones:** mismo fichero, mismo instrumento y autorización ya concedida. No nuevas descargas, instrumentos, APIs, cuentas, contacto, cuotas ni costes.

## Nasdaq Nordic — siguiente paso tras validación local (26-11-2026)

- [x] Ejecutar el validador local sobre el único CSV autorizado.
- [x] Revisar coherencia estructural y aritmética: cero anomalías críticas detectadas.
- [x] Contrastar a nivel general la oferta oficial de productos EOD Nasdaq Nordic.
- [ ] Identificar el producto/página exactos de origen del CSV y localizar especificación pública que defina sus cabeceras, unidades, moneda, ámbito de mercado y reglas de agregación.
- [ ] Confirmar si las fechas están en orden descendente o en otro orden; observación menor, no bloqueante por sí sola.
- [ ] Mantener bloqueado el uso de volumen/turnover como señal, y toda ingesta recurrente/retención histórica, hasta resolver semántica, cobertura y derechos.

**Estado:** validación técnica básica superada con limitaciones; Nasdaq no aprobado como proveedor. No solicitar al usuario el CSV bruto ni ampliar la muestra. No contactar con Nasdaq, crear cuentas, consumir cuotas ni descargar más datos.


## Nasdaq Nordic — identificación del origen del CSV (26-11-2026)

- [x] Contrastar el CSV agregado con la descripción oficial de la descarga MiFID `Download CSV` sobre la tabla `Trades`.
- [x] Confirmar que Nasdaq describe esa descarga como todas las operaciones del día actual, retrasadas 15 minutos; el fichero de seis filas diarias no encaja con esa descripción.
- [x] Revisar la ficha oficial de Nokia, que separa `Historical Prices Chart` y `Trades`, y la descripción de Nordic End of Day Reports.
- [ ] Si el usuario recuerda el control exacto usado, registrar si fue exportación de `Historical Prices Chart` o descarga de `Trades`; no pedir el CSV bruto ni otra descarga.
- [ ] Mantener origen exacto y diccionario de campos como no identificados hasta disponer de evidencia directa.
- [ ] No usar volumen/turnover para señales ni aprobar automatización/retención histórica.

**Conclusión:** hipótesis más probable: exportación de histórico de precios de la ficha Nokia, no el CSV MiFID de operaciones. No se ha podido confirmar públicamente el producto upstream. No ampliar el piloto ni realizar nuevas descargas, llamadas o contactos.
