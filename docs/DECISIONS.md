# Decisions Log

## Confirmadas
- Producto informativo; no broker ni ejecución automática.
- Activos: acciones, ETF y criptomonedas.
- Mercados principales: Estados Unidos y Europa.
- Tres horizontes: corto (1–10 días), medio (2 semanas–6 meses), largo (6–36 meses).
- Señales de compra, venta/evitar exposición y oportunidades tras caídas/rebotes.
- Enfoque conservador; abstención válida; calidad sobre cantidad.
- Precio observado, frescura y niveles de entrada/salida explícitos.
- No perseguir precio si supera máximo de entrada.
- PWA mobile-first, sin app nativa.
- Telegram y resumen semanal por email.
- Un único usuario privado; sin acceso compartido ni redistribución.
- Ledger inmutable y evaluación objetiva.
- Prioridad inicial absoluta al coste cero; reconsiderar pagos sólo tras validar el sistema gratuito y medir sus límites.
- IA estructura noticias; reglas deterministas deciden señales.

- GitHub es la fuente persistente de verdad del proyecto; los chats son temporales.
- Todo chat debe cerrar con un siguiente paso inequívoco: pregunta concreta para continuar o prompt de relevo completo para un chat nuevo.

## Restricciones
- No asumir acceso a InvestingPro.
- No centrar noticias sólo en Expansión.
- No scrapear contenido protegido ni usar suscripciones personales para extracción automatizada.
- No contratar sin autorización.
- No programar aplicación funcional antes de validar datos, licencias, costes y arquitectura.
- No presentar hipótesis como decisiones.
- No dejar al usuario sin una acción clara al terminar un chat; aplicar docs/WORKFLOW.md.

## Hipótesis / candidatas no aprobadas
- GitHub Actions u otro scheduler gestionado.
- Supabase/Postgres.
- PWA estática.
- Telegram Bot API y proveedor SMTP/email.
- Proveedores de mercado y noticias listados en DATA_SOURCES.md.

## Cuestiones abiertas
1. ¿Qué licencia permite un dashboard privado para tres personas, con datos/derivados, histórico, Telegram y email?
2. ¿Qué bolsas europeas y ETF son imprescindibles?
3. ¿Qué latencia es necesaria para cada horizonte y tipo de señal?
4. ¿Qué definición formal tendrán compra moderada/fuerte y venta/evitar?
5. ¿Cómo se definirán entrada, máximo, objetivo, stop, caducidad e invalidación por estrategia?
6. ¿Qué universo inicial y benchmarks se utilizarán?
7. ¿Qué mecanismo de autenticación separa a los tres usuarios?
8. ¿Qué proveedor de email, hosting, base de datos y scheduler cumple límites/coste?
9. ¿Qué política de retención y uso de datos con modelos LLM permite cada proveedor?
10. ¿Qué criterios cuantitativos autorizan pasar de paper trading a uso continuado?

## Registro de cambios
- 2026-11-24: primera consolidación documental a partir del contexto del proyecto. Investigación documental inicial de proveedores; ningún proveedor aprobado.
- 2026-11-24: README actualizado; se establece GitHub como fuente persistente de contexto y protocolo de relevo entre chats.
- 2026-11-24: se formaliza el cierre obligatorio de cada chat con pregunta concreta o prompt de relevo completo; detalle en docs/WORKFLOW.md.


## Decisiones y conclusiones de licencia — escenario histórico de tres usuarios (24-11-2026)

**SUPERADO:** este bloque documenta por qué se abandonó el uso compartido. No representa el alcance ni los criterios actuales.

### Conclusiones confirmadas documentalmente
- El caso de uso objetivo es un único dashboard autenticado para tres familiares adultos, con backend centralizado, cotizaciones/históricos, indicadores y señales comunes, backtesting, alertas Telegram/email y procesamiento IA/LLM. No hay empresa, ingresos ni ánimo de lucro.
- **No equiparar uso privado/no comercial con permiso de redistribución.** El dato mostrado a los otros dos usuarios, o una señal/alerta derivada, puede ser display o distribución a terceros.
- EODHD personal: explícitamente una persona; prohíbe compartir incluso con familia, dashboards privados y outputs con otras personas. Sólo permite derivados/backtests para uso exclusivo del titular. (https://eodhd.com/help/personal-use)
- FMP individual: sólo beneficio personal individual; prohíbe mostrar/distribuir datos o señales/outputs sustanciales a otros. IA permitida sólo para análisis individual, no para beneficio de otros. (https://site.financialmodelingprep.com/terms-of-service)
- Massive individual: sólo uso propio personal; compartir datos/servicios a otros prohibido. Resultados no reconstruibles pueden conservarse para uso propio; datos deben eliminarse en 30 días al acabar licencia. IA externa sólo como procesador por cuenta del usuario y no para terceros, salvo permisos. (https://massive.com/legal/market-data-terms-of-service)
- Finnhub: planes publicados personales; prohíbe compartir datos o derivados sin autorización escrita y exige borrar datos al acabar suscripción. (https://finnhub.io/terms-of-service)
- Alpha Vantage: términos personales/no comerciales consideran comercial facilitar a otros acceso directo o indirecto a información. (https://www.alphavantage.co/terms_of_service/)
- Twelve Data: diferencia uso interno, display y redistribución; los derechos de derivados exigen que no se pueda reconstruir el dato; display/redistribución depende de tier/add-on/acuerdo y derechos de exchange. No hay confirmación de que tres familiares sean Authorized Users. (https://support.twelvedata.com/en/articles/5332349-commercial-and-personal-usage)
- Alpaca: el feed sandbox IEX documentado para pruebas tiene una excepción de redistribución, pero no es autorización de producción; SIP/feeds de producción requieren acuerdos y clasificación de usuarios. No aprobar sin acuerdo escrito.
- Stooq: licencia de API/redistribución no verificada; ausencia de términos legibles no es permiso.
- GDELT: permite uso y redistribución de sus datasets con atribución y enlace; no concede derechos sobre el contenido protegido de las noticias enlazadas. (https://www.gdeltproject.org/about.html)
- Marketaux: API entrega snippets y enlaces; los TOS públicos consultados no resuelven de forma suficiente los derechos de display compartido/redistribución de la API. Requiere aclaración.
- Ningún proveedor ha sido contratado, ninguna consulta enviada y no se han usado credenciales ni consumido cuotas.

### Decisiones de control
- No aprobar planes personales para el dashboard de tres personas por el mero hecho de que el uso sea familiar, privado, autenticado y gratuito.
- Exigir confirmación escrita contractual que cubra por separado: display a tres personas, históricos y almacenamiento/backtesting, outputs derivados y señales, alertas Telegram/email, uso IA/LLM, retención/borrado y derechos de proveedores/exchanges subyacentes.
- La respuesta «uso no comercial permitido» no basta. Debe identificar explícitamente los tres usuarios y el flujo de datos.
- GDELT queda como candidato documental para metadatos/eventos, con atribución y sin reutilizar texto completo de terceros.
- No cambiar arquitectura ni iniciar desarrollo hasta cerrar el bloqueo de licencias y costes.

### Hipótesis abiertas
- Twelve Data podría ofrecer una combinación de plan Business/Venture y permisos de display/derivados adecuada, pero no está confirmado ni presupuestado.
- Alpaca podría ser útil para datos USA bajo acuerdo específico; no se conoce coste total de producción y reporting para tres usuarios.
- Una arquitectura con un único titular que calcula y comparte sólo señales puede seguir siendo redistribución de derivados; no considerarla solución sin autorización expresa.
- Tres cuentas individuales separadas podrían autorizar análisis propio independiente, pero no el dashboard centralizado ni señales comunes.

### Registro de cambios
- 2026-11-24: auditoría documental de licencias para el caso de tres familiares; se añaden conclusiones, matriz de derechos y plantillas de consultas en DATA_SOURCES.md.


## Cambio de alcance confirmado — 24-11-2026

- **Market Radar será exclusivamente para uso privado de un único usuario: el titular.** No habrá dashboard compartido con familiares, cuentas adicionales, invitados ni acceso de terceros.
- Cotizaciones, históricos, indicadores, señales, backtesting e informes serán sólo para análisis del titular y no se compartirán ni publicarán.
- Telegram y email, si se implementan, enviarán alertas únicamente al titular.
- IA/LLM se utilizará como herramienta de análisis personal, sujeto a las restricciones de cada proveedor de datos y del proveedor de IA.
- Esta decisión sustituye el requisito previo de tres familiares y deja sin efecto la necesidad de negociar licencias de display multiusuario. La auditoría anterior se conserva como histórico, no como requisito vigente.
- No implica que cualquier plan gratuito/personal permita automáticamente almacenamiento ilimitado, uso de LLM, automatización o retención tras cancelar. Esos derechos siguen pendientes de verificar proveedor por proveedor.
- No contratar, pagar, usar credenciales ni consumir cuotas sin autorización expresa. No desarrollar la aplicación hasta completar la selección documental y la validación técnica.



## Prioridad gratuita-first confirmada — 24-11-2026
- La fase inicial debe utilizar exclusivamente fuentes y servicios gratuitos, siempre que las licencias permitan el uso previsto.
- No contratar, activar pruebas de pago ni consumir cuotas/credenciales sin autorización expresa.
- No se fija un techo de gasto mensual futuro: se reconsiderará el pago sólo cuando exista un sistema gratuito operativo y se conozcan sus limitaciones reales.
- La falta de coste no justifica usar datos sin derechos claros ni sacrificar la integridad de las señales. Si no hay fuente gratuita válida para una cobertura, se documentará el hueco y el sistema deberá abstenerse.
- El alcance sigue siendo un único usuario privado.


## Universo y cadencia de la v1 — 24-11-2026 (actualizado)
- Universo inicial vigente: NVDA, MSFT, META, AMZN, JNJ, ASML (Euronext Amsterdam), SAP (Xetra), SAN (BME Madrid), SPY, VWCE (Xetra), BTC/USD y ETH/USD.
- NVIDIA, Microsoft y Meta son inclusiones expresamente solicitadas por el usuario. JNJ sustituye a CNR para incorporar el sector salud como referencia no tecnológica; CNR queda como posible activo futuro, no como requisito de esta prueba.
- V1 sin intradía ni WebSockets: una actualización diaria EOD y, opcionalmente, una segunda comprobación selectiva de eventos materiales. Objetivo de 1–2 resúmenes/alertas diarios como máximo, sólo si hay cambios relevantes.
- Si los datos gratuitos no son suficientemente frescos o completos, mostrar la limitación y abstenerse; no presentar datos retrasados como ejecutables.
- La selección de instrumentos es un universo de monitorización, no una recomendación de compra ni asignación de cartera.


## Ajuste del universo de prueba — 24-11-2026

- Se sustituye Core Natural Resources (CNR) por Johnson & Johnson (JNJ) en el universo inicial de 12 activos.
- Motivo: incorporar salud como sector no tecnológico y evitar que la única diversificación sectorial propuesta dependiera de una minera de carbón de riesgo cíclico elevado.
- CNR no queda descartada definitivamente; deja de ser necesaria para la primera validación de proveedores.
- JNJ se incluye exclusivamente como instrumento de seguimiento y prueba de cobertura, no como recomendación de inversión.
- La matriz documental de proveedores y consumo EOD queda incorporada en la sección 13 de DATA_SOURCES.md. Ningún proveedor está validado; no se han ejecutado llamadas ni consumido cuotas.
- Primera hipótesis de prueba: EODHD Free (12/20 llamadas teóricas), contraste USA con Alpaca Basic y contraste alternativo con FMP/Alpha Vantage. La selección queda pendiente de pruebas de símbolo, cobertura, calidad, ajustes, histórico y licencia.

---

## Evidencia técnica inicial de proveedores — 24-11-2026

- EODHD devolvió 12/12 instrumentos del universo inicial; Alpaca Basic con feed IEX devolvió 6/6 símbolos USA probados.
- Para NVDA, MSFT, META, AMZN, JNJ y SPY, los 18 cierres EODHD de los días 19, 20 y 23-11-2026 coinciden al céntimo con los valores históricos consultados en Yahoo Finance.
- Los cierres de Alpaca IEX difieren de EODHD una media absoluta aproximada del 0,068% (máximo 0,169%). IEX no representa el volumen consolidado.
- Esto es evidencia técnica favorable, no aprobación de proveedor: muestra pequeña, posible dependencia de fuentes upstream comunes y licencia/retención/IA pendientes.
- La diferencia de `adjustedClose` de JNJ queda explicada por el ajuste retroactivo de EODHD al dividendo de 1,34 USD con ex-date 24-11-2026; no mezclar ajustes entre proveedores sin normalizar metodología y fecha de referencia.

**Decisión:** no seleccionar todavía EODHD ni Alpaca como proveedor de producción. Mantener EODHD como candidato principal multi-mercado y Alpaca IEX como contraste USA mientras se resuelven ajustes, profundidad histórica y licencias.



### Aclaración de ajustes de dividendos — JNJ (24-11-2026)

La diferencia de EODHD `adjustedClose=268.71` frente al cierre raw de 270.05 el 23-11-2026 queda explicada por el dividendo de 1,34 USD con ex-date 24-11-2026. La metodología oficial de EODHD ajusta `adjusted_close` por dividendos y splits; el factor aplicado es (270.05 - 1.34) / 270.05 = 0.99503796. El valor ajustado resultante coincide con el informe. Fuente primaria del dividendo: comunicado oficial de JNJ del 13-10-2026. No se considera una anomalía del cierre raw.


### Autorización y alcance de muestra histórica EODHD — 24-11-2026

El usuario autoriza una prueba técnica adicional acotada, orientada a validar profundidad histórica, siempre que se mantenga el foco en el resultado y no se incurra en costes ni se excedan cuotas. Se prepara una ejecución de exactamente cuatro peticiones para NVDA.US, ASML.AS, VWCE.XETRA y BTC-USD.CC, con barras diarias entre 2025-11-24 y 2026-11-24.

La prueba no consulta Alpaca, no reintenta, no pagina y no amplía la ventana. El usuario debe comprobar que su contador EODHD permite al menos cuatro llamadas adicionales antes de ejecutarla. No se comparte ninguna credencial. La autorización no cubre planes de pago, pruebas de pago ni consumos adicionales.


## Validación histórica EODHD — decisión provisional (24-11-2026)

- Se ha completado una muestra histórica EOD diaria de 12 meses para NVDA.US, ASML.AS, VWCE.XETRA y BTC-USD.CC mediante exactamente cuatro peticiones EODHD.
- Las cuatro consultas fueron aceptadas (HTTP 200); se recibieron 1.125 barras en total y se superaron controles estructurales básicos de fechas, orden, duplicados, OHLC y volumen.
- **Decisión:** EODHD supera provisionalmente la prueba técnica acotada de disponibilidad, cobertura anual y consistencia estructural para estos cuatro instrumentos.
- Esta decisión **no equivale a aprobar EODHD para producción**, ni valida el resto del universo de 12 activos. Siguen pendientes la revisión de licencias y derechos de uso individual, almacenamiento, automatización y LLM; la contrastación independiente de movimientos extremos; la validación de ajustes corporativos; y la evaluación de estabilidad y profundidad histórica suficiente.
- Se mantienen separados `close` y `adjustedClose`; la metodología de ajustes debe normalizarse antes de combinar proveedores o realizar backtests.
- No se autoriza por esta decisión ninguna petición adicional, consumo de cuota, contratación ni prueba de pago.

### Registro de cambios
- 2026-11-24: se registra la conclusión provisional de la muestra histórica EODHD de cuatro instrumentos. Detalle y métricas en docs/DATA_SOURCES.md, sección 17.


---

## Diseño del Explorador de acciones — 24-11-2026

### Confirmado
- El módulo de exploración se centra en acciones cotizadas de EE. UU. y Europa, universo amplio y sin limitación sectorial.
- ETF y criptomonedas quedan fuera de este universo y siguen en seguimiento separado.
- Arquitectura por adaptadores desacoplados para catálogo, precios, fundamentales, noticias y eventos.
- Escaneo EOD diario; sin intradía ni WebSockets. Segunda comprobación sólo para eventos materiales.
- El catálogo de instrumentos no dependerá del proveedor de precios y el ticker no será clave primaria.
- El LLM no decide señales ni modifica las puntuaciones cuantitativas; el filtrado y la decisión final serán deterministas y admitirán abstención.

### Propuesta de mercados iniciales (pendiente de validación final)
- EE. UU.: Nasdaq, NYSE y NYSE American; acciones ordinarias y ADR, excluyendo OTC y valores no equivalentes a acciones.
- Europa: Xetra, Euronext (Amsterdam, Paris, Brussels, Lisbon, Milan), BME y LSE Main Market. Ampliación posterior: SIX, Nasdaq Nordic, Warsaw y otros mercados.
- No describir esta primera fase como cobertura de toda Europa; cobertura explícita por bolsa/MIC.

### Candidatos, no aprobados
- Nasdaq Trader + Massive All Tickers para descubrimiento USA.
- ESMA FIRDS + directorios de bolsa para universo UE/EEE; LSE por fuente separada.
- Massive Stocks Basic como candidato técnico de precios USA, sujeto a clasificación personal/non-professional, licencia, retención y pruebas autorizadas.
- SEC EDGAR para filings/XBRL USA.
- GDELT como detector de noticias/metadatos, con confirmación en fuentes primarias.

### Bloqueos y pendientes
- No existe todavía una fuente gratuita paneuropea de OHLCV EOD automatizable, amplia y con derechos de almacenamiento/uso claros.
- No aprobar Massive, EODHD, Euronext ni BME como fuente de producción.
- No ejecutar llamadas API, usar credenciales, crear cuentas o consumir cuotas sin autorización expresa.
- No iniciar desarrollo del Explorador amplio hasta resolver cobertura/licencia de precios europeos.
- Los hallazgos, límites y enlaces oficiales quedan documentados en docs/EXPLORER_DESIGN.md y docs/DATA_SOURCES.md, sección 18.

### Corrección de vigencia documental
Los bloques anteriores que mencionan tres usuarios, PWA como requisito inmediato, cadencia intradía o universo ETF/cripto como alcance principal son antecedentes históricos o hipótesis superadas. Prevalecen el uso privado de un único titular, el alcance de acciones USA/EU para el Explorador, ETF/cripto separados y la cadencia EOD confirmados en este registro y en docs/WORKFLOW.md / docs/PRODUCT_SPEC.md.


---

## Actualización de fuentes europeas — 24-11-2026

- La investigación confirma que los ficheros públicos MiFIR post-trade pueden ser automatizables: Reglamento Delegado (UE) 2025/1156, arts. 23–25. Esto corrige la hipótesis demasiado tajante de que no existía ninguna fuente gratuita automatizable europea.
- Euronext Trades Files es candidato prioritario para OHLCV propio por venue: CSV, 15 min retraso, 7 mercados, uso gratuito salvo distribución según sus términos. Aún pendiente validar esquema, flags y retención.
- Xetra/Deutsche Börse ofrece JSON.gz post-trade gratuito y descargable, pero se requiere confirmar por escrito el uso automatizado privado/non-display y retención.
- Cboe Europe ofrece CSV de transacciones de sus venues y APA/MTF reportadas; fuente complementaria, no consolidado total.
- BME ofrece JSON post-trade, pero su página restringe el uso a personal/interno; no aprobar job automatizado hasta confirmar condiciones.
- LSEG exige licencia para non-display y otras aplicaciones; no aprobar automatización sin licencia.
- EuroCTP está operativo desde 14-09-2026 y consolida el mercado UE. Minoristas pueden acceder gratuitamente vía web, pero Non-Display Use exige Data Licence; fee schedule publicado indica 4.000 €/mes + 56 €/mes de Web API y 204 €/día de histórico. No viable para el escáner automático con tarifas actuales.
- OHLC.io, Twelve Data y Alpha Vantage no resuelven gratuitamente la cobertura EOD europea completa. Yahoo scraping no permitido por términos.

### Próxima prioridad
Validar Euronext y Xetra como fuentes de transacciones por venue, incluyendo correcciones/cancelaciones, flags y calidad de cierre. Diferenciar explícitamente volumen del venue de volumen consolidado. No ejecutar descargas ni pruebas de datos hasta autorización expresa.


## Decisión — tratamiento legal de feeds públicos europeos (24-11-2026)

El carácter privado/no comercial de Market Radar no se tratará como exención general de scraping o de licencias de datos.

- Euronext Trades Files: la cláusula específica permite gratuitamente el uso sin restricciones salvo distribución. Se considera candidato provisional para procesamiento interno y derivados no distribuidos; no redistribuir datos ni asumir que la disponibilidad de 24h autoriza conservar raw indefinidamente. Minimizar almacenamiento crudo y priorizar OHLCV/indicadores derivados, sujeto a términos.
- Xetra/Deutsche Börse: la Guidance Note V4.0 (01-08-2026) introduce categorías y tarifas non-display para productos MiFIR; Market Radar genera análisis técnico y señales, excluidos de simple analytics. No usar hasta comprobar la tarifa/licencia específica. No contactar con proveedores.
- Cboe: sólo complemento técnico; no basar señales de inversión en el feed debido al disclaimer y a la falta de garantías.
- En todas las fuentes separar automatización, condiciones contractuales, derechos de base de datos, uso non-display, retención y redistribución.


## Decisión — Xetra para el Explorador (24-11-2026)

Descartar Xetra como fuente del screening automatizado en la fase actual. Aunque los ficheros delayed se descargan gratis con 15 minutos de retraso, la política DBAG separa acceso de uso non-display. Market Radar realiza análisis técnico y genera señales, excluidos de simple analytics. La lista de precios v11_01 publica 480 €/mes Entry para Xetra Post-Trade en la categoría tarifada por Device Access, pero deja vacía la columna Other Application Usage; no hay tarifa pública identificada que habilite claramente el uso requerido. No contactar al proveedor ni asumir que la tarifa de 480 € cubre este caso.


## Fuentes europeas post-trade adicionales — 24-11-2026

- Nasdaq Nordic/Baltic se incorpora como candidato fuerte para OHLCV por venue: CSV, 15 min de retraso, ficheros cada minuto y uso no comercial gratuito; la ventana publicada es 48 h, no permiso de retención indefinida. Esquema, flags y completitud pendientes.
- NGM se incorpora como candidato secundario: CSV, 15 min de retraso, 72 h de disponibilidad y uso no comercial gratuito; cobertura y campos transaccionales pendientes.
- SIX Historical Prices no sirve para construir OHLCV completo: ofrece cierre y turnover, no el tape de operaciones. SIX MDDX es un producto licenciado.
- LSEG/TRADEcho y BME siguen bloqueados por incertidumbre sobre non-display/automatización y retención.
- Euronext sigue siendo la prioridad inicial; no se presume autorización de retención indefinida de raw.
- Arquitectura propuesta: adaptadores por venue, normalización de flags/correcciones/deduplicación, OHLCV venue-specific y quality gate; no llamar consolidado al volumen parcial.
- Detalle y fuentes: docs/EUROPEAN_POST_TRADE_RESEARCH_2026-11-24.md.


## Decisión — Nasdaq Nordic/Baltic y NGM (25-11-2026)

- **Nasdaq Nordic Equity:** candidato preferente para un primer piloto acotado, pendiente de inspeccionar un CSV real y resolver la retención histórica. Motivos: CSV delayed oficial, uso no comercial gratuito, ficheros por minuto, afirmación de todos los trades del día por instrumento y especificación NLS pública con identificadores/flags (sin asumir que el CSV replica NLS).
- **Nasdaq Baltic Equity:** mantener como subcandidato; validar por separado formato y cobertura, dado que la guía diferencia XLSX de descarga individual y CSV en Regulatory Reports.
- **NGM:** no descartar, pero no iniciar ingesta todavía. La política v1.4 genera ambigüedad para automatización non-display/Derived Information (7.3, 8 y 9.6), y no autoriza claramente retención perpetua de ficheros gratuitos.
- Para ambos: no hay prueba de retención raw indefinida; 48/72 h son ventanas de disponibilidad, no licencias de archivo. Los CSV exactos no se han inspeccionado y la completitud no está validada.
- Toda barra sería venue-specific, no volumen consolidado. No aprobar señales de volumen/liquidez hasta demostrar cobertura.
- No descargar, crear cuentas, ejecutar APIs, contactar proveedores ni consumir cuotas sin autorización expresa.
- Evidencia y análisis: docs/EUROPEAN_POST_TRADE_RESEARCH_2026-11-24.md, actualización 25-11-2026.

## Decisión — diseño del piloto Nasdaq Nordic Equity (25-11-2026)

- Aprobar únicamente el **diseño documental** de un piloto con un solo CSV, un instrumento y una sesión completa de Nasdaq Nordic Equity.
- No se ha inspeccionado ningún CSV. RTS 1 y NLS no acreditan el esquema del CSV público.
- La reconstrucción será venue-specific: aplicar cancelaciones/enmiendas antes de OHLCV, separar categorías de flags y no mezclar Nasdaq APA.
- La disponibilidad de 48 h y el uso no comercial gratuito no acreditan retención raw ni derivada indefinida. No aprobar almacenamiento histórico ni job recurrente.
- **Bloqueo:** autorización expresa antes de descargar el único fichero de muestra. Sin descargas adicionales, cuentas, contacto, APIs, cuotas ni costes.
- Procedimiento: docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md.

## Estado de ejecución — autorización Nasdaq Nordic recibida (25-11-2026)

- El usuario autorizó expresamente un único CSV, un instrumento y una sesión completa.
- Muestra candidata: Nokia Oyj (NOKIA), ISIN FI0009000681, MIC XHEL; sesión candidata 25-11-2026.
- No se descargó ningún fichero: la ficha oficial consultada no muestra los datos ni el enlace «Download CSV» en el navegador disponible. No usar APIs ni sustituir el fichero diario por múltiples CSV minuto a minuto.
- La guía general Nasdaq MiFID II menciona disponibilidad de 24 h, mientras la página específica Nordic Equity Post-Trade indica 48 h. Mantener la discrepancia abierta.
- Siguiente paso: recibir el CSV diario único descargado desde la ficha oficial o disponer de acceso funcional a su enlace de descarga. No ampliar la autorización.

## Decisión — ampliación del piloto Nasdaq Nordic a cinco días (25-11-2026)

- El usuario autoriza **un único CSV de cinco días** para Nokia Oyj (NOKIA), ISIN FI0009000681, MIC XHEL.
- La autorización anterior de una sesión queda reemplazada por este alcance: un fichero, un instrumento, todas las sesiones que incluya ese CSV.
- No autoriza ficheros adicionales, otros instrumentos, APIs, endpoints alternativos, automatización, cuentas, contacto ni retención histórica.
- Descarga pendiente: la ficha web accesible no expone el enlace dinámico. Se puede completar el análisis si el usuario adjunta el fichero oficial descargado.

### Nasdaq Nordic CSV — diagnóstico local (26-11-2026)

El primer informe local de \`nokia_20261125_210111.csv\` no es válido para inferir el esquema: el fichero comienza con la directiva Excel \`sep=;\`, que el inspector inicial interpretó como cabecera. Se corrigió \`tools/inspect_nasdaq_csv.py\` para omitirla. Hasta recibir el segundo informe, no asumir cabeceras, campos, número real de trades ni posibilidad de reconstruir OHLCV. El CSV permanece en el equipo del usuario y no se incorpora al repositorio.



### Nasdaq Nordic — interpretación provisional del CSV Nokia (26-11-2026)

- El segundo diagnóstico del único CSV autorizado muestra seis filas y campos `Date`, OHLC, `Average price`, `Total volume`, `Turnover`, `Trades`, `Bid` y `Ask`.
- **Hipótesis preferente:** el fichero contiene barras/estadísticas diarias preagregadas, no un tape de operaciones. No se puede reconstruir ni auditar correcciones individuales a partir de este esquema aparente.
- No interpretar `Bid`/`Ask` como IDs; son candidatos a cotizaciones.
- Añadido `tools/validate_nasdaq_daily_bars.py` para controles locales de consistencia, sin red y sin imprimir valores de mercado.
- No considerar Nasdaq validado: faltan resultado del segundo script, documentación semántica de campos/unidades, prueba de cobertura y aclaración de retención.
- Cualquier resultado se etiquetará como venue-specific; no llamarlo volumen consolidado.
- Se mantiene el alcance: un único CSV de cinco días de Nokia Oyj (NOKIA, ISIN FI0009000681, MIC XHEL). Sin otros instrumentos/ficheros, APIs, cuentas, contacto, cuotas ni costes.

## Nasdaq Nordic — resultado de validación local (26-11-2026)

- El único CSV autorizado de Nokia contiene seis filas de barras/estadísticas diarias aparentes. El validador local detectó cero anomalías críticas estructurales o aritméticas: fechas/números parseables, OHLC coherente, Average price dentro del rango, Bid <= Ask, volumen no negativo y Trades entero/no negativo.
- La validación es **coherencia interna básica**, no prueba exactitud, completitud, cobertura consolidada ni ausencia de sesiones omitidas.
- La documentación oficial de productos Nasdaq Nordic EOD confirma que su cartera de datos incluye estadísticas diarias como high/low, VWAP, average price, trade count, volume y bid/ask al cierre. No se ha identificado de forma concluyente el producto/licencia exacto que originó el CSV del usuario; por tanto no se atribuyen a sus campos definiciones ni derechos de otro producto.
- No llamar VWAP a `Average price` ni interpretar unidad de `Total volume`, moneda de `Turnover` o ámbito de `Bid/Ask` sin documentación específica.
- **Decisión:** piloto técnico local superado sólo en coherencia estructural/aritmética, con limitaciones. Nasdaq Nordic sigue sin aprobarse para producción, señales basadas en volumen, automatización o retención histórica. No contactar, usar APIs/cuotas ni descargar muestras adicionales.

Registro: 26-11-2026.


## Nasdaq Nordic — origen del CSV no identificado (26-11-2026)

- La página oficial MiFID II explica que el `Download CSV` encima de la tabla `Trades` de una acción descarga todas las operaciones del día actual, con 15 minutos de retraso. El CSV del piloto tiene seis filas diarias agregadas; por tanto, no se ha demostrado que sea esa descarga y su estructura no encaja con la descripción del fichero de operaciones.
- La ficha de Nokia tiene componentes separados de histórico de precios y de operaciones. Es plausible que el fichero se exportara desde `Historical Prices Chart`, pero no está confirmado.
- La documentación de Nordic End of Day Reports y la definición de Average Traded Price en las reglas Nasdaq aportan contexto, pero no identifican el producto ni el diccionario de campos del CSV concreto.
- **Decisión:** clasificar el origen exacto y la semántica de las columnas como no identificados. No etiquetar `Average price` como VWAP ni asumir unidad/moneda/ámbito de volumen/turnover. No aplicar términos de licencia de otro producto Nasdaq al fichero.
- El resultado del piloto se limita a coherencia estructural/aritmética básica. Nasdaq no queda aprobado para OHLCV de producción, señales basadas en volumen, automatización ni retención histórica.

Registro: 26-11-2026.
