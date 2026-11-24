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
