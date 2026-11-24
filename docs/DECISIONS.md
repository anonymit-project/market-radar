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
- Tres usuarios, señales comunes y carteras virtuales independientes.
- Ledger inmutable y evaluación objetiva.
- Preferencia por coste inicial cero y servicios cloud de bajo mantenimiento.
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


## Decisiones y conclusiones de licencia (24-11-2026)

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

