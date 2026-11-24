# Data Sources — evaluación preliminar

**Estado:** investigación documental inicial; ningún proveedor está validado ni contratado. Precios y límites son los publicados en las páginas oficiales consultadas el 24-11-2026; pueden cambiar. Confirmar siempre el plan aplicable y los derechos por escrito antes de producción.

**Nota de vigencia:** las secciones 2–8 contienen una evaluación preliminar anterior y referencias al escenario multiusuario. La selección vigente es exclusivamente individual y gratuita-first; prevalecen las secciones 10–11. No utilizar las conclusiones de las secciones antiguas como requisitos actuales.

## 1. Criterios de validación
- Cobertura por país, bolsa, MIC, activo y ticker.
- Endpoint exacto, granularidad, frescura/latencia y disponibilidad histórica.
- Calendarios, splits, dividendos, ajustes y símbolos deslistados.
- Cuotas por minuto/día, pesos de endpoint, concurrencia y límites de WebSocket.
- Precio mensual real, facturación anual, impuestos y add-ons.
- Derechos de almacenamiento, caché, uso interno, uso privado individual del titular, derivados, redistribución y uso con IA.
- Fiabilidad, SLA, soporte, estabilidad de esquemas y pruebas reproducibles.

## 2. Proveedores de mercado

| Proveedor | Plan gratuito / precio público visto | Cobertura y capacidades publicadas | Lectura inicial |
|---|---|---|---|
| EODHD | Free: 20 llamadas/día, un año EOD. EOD All-World $19.99/mes; EOD+Intraday $29.99/mes; All-in-One $99.99/mes (página personal consultada; precios comerciales pueden diferir). | EOD acciones, ETF, fondos, índices, FX y cripto; 70 bolsas listadas según Exchanges API; intradía y websocket en plan superior. | Candidato fuerte para histórico multi-mercado económico; el free es insuficiente. Verificar composición de fuentes y derechos de uso para tres usuarios. |
| Twelve Data | Basic $0: 8 créditos/min y 800/día. Grow desde $29/mes; más créditos y mercados en tiers superiores. | Basic incluye US equities/ETF, FX y cripto en tiempo real; Grow anuncia EOD global equities/ETF; Pro incluye datos europeos en tiempo real. | Buen candidato para prueba de API y comparación; cobertura de Europa en tiempo real parece exigir tier superior y add-ons/licencias. |
| FMP | Basic $0: 250 llamadas/día; Starter $19/mes facturado anual; Premium $49; Ultimate $99. | Free EOD y referencia; Starter declara US, histórico y noticias; Premium amplía histórico e intradía; Global coverage en Ultimate. | Muy interesante para prototipo de fundamentals, pero cobertura geográfica completa y display requieren comprobarse. |
| Massive (antes Polygon) | Stocks Basic $0: 5 llamadas/min, EOD, dos años y 100% market coverage; Starter $29/mes, 15 min delayed; tiers superiores $79/$199. | Planes por clase de activo; APIs de agregados, snapshots y WebSocket según tier. La página de stocks no equivale a cobertura europea global. | Buen candidato para histórico/mercado USA; no asumir que el plan individual permite compartir datos. |
| Alpaca | Basic gratis; Algo Trader Plus $99/mes. | Acciones/ETF USA; free usa IEX, paid SIP consolidado; historial desde 2016; free limita historial reciente a últimos 15 minutos según tabla de documentación. | Feed gratuito no representa todo el volumen consolidado. No resuelve Europa ni cripto global por sí solo. |
| Finnhub | Plan y límites deben confirmarse en pricing actual y cuenta. | APIs de candles, quote, news, filings, earnings, ETF y crypto; algunas noticias/funciones tienen restricciones geográficas (p. ej. company-news documentado para Norteamérica en OpenAPI consultado). | Candidato de amplitud funcional; no aprobar sin verificar cuotas y endpoints exactos en documentación oficial. |
| Alpha Vantage | 25 solicitudes/día gratis; proyectos open-source/educativos verificados pueden tener excepción. | Amplia API; real-time y 15-min delayed US equity data son premium por regulación/licencia de mercado. | Útil para pruebas pequeñas, insuficiente como ingesta amplia gratuita. |
| Stooq | Condiciones comerciales/API y límites por validar. | Fuente candidata para histórico, no asumir cobertura/latencia ni SLA. | Sólo benchmark experimental hasta comprobar términos y consistencia. |

### Documentación oficial consultada
- EODHD: https://eodhd.com/pricing ; https://eodhd.com/help/plans ; https://eodhd.com/financial-apis/api-for-historical-data-and-volumes ; https://eodhd.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours
- Twelve Data: https://twelvedata.com/pricing ; https://twelvedata.com/docs
- FMP: https://site.financialmodelingprep.com/pricing-plans ; https://site.financialmodelingprep.com/developer/docs
- Massive: https://massive.com/pricing ; https://massive.com/docs/rest/stocks/overview
- Alpaca: https://docs.alpaca.markets/docs/about-market-data-api
- Alpha Vantage: https://www.alphavantage.co/support/
- Finnhub: https://finnhub.io/docs/api
- Stooq: https://stooq.com/

## 3. Licencias: bloqueo crítico para tres usuarios
- EODHD define uso personal como una persona y prohíbe compartir cuenta/API key o mostrar datos a otras personas bajo plan personal. Para varios usuarios/app/dashboard debe solicitarse licencia comercial y describir salidas derivadas.
- Twelve Data diferencia planes individuales y Business. Los individuales no permiten redistribución; display externo y derechos de redistribución requieren tier/add-on/acuerdo. Los derivados deben ser no reversibles.
- Massive: planes individuales son para uso personal, no comercial; redistribución/display a usuarios requiere licencia comercial.
- FMP: términos prohíben redistribuir, mostrar o proporcionar datos y outputs que contengan una parte sustancial de los datos sin autorización expresa.
- Alpaca: verificar por separado feed, tipo de cuenta, exchange subscriber status y derechos de display.
- SEC EDGAR: datos de filings públicos con política de acceso justo; citar la fuente y respetar User-Agent y límites.

La audiencia de tres usuarios hace que una suscripción individual no pueda darse por válida. Solicitar confirmación escrita del uso: grupo privado de tres personas, dashboard autenticado, señales y/o cotizaciones visibles, persistencia, Telegram/email y outputs derivados.

## 4. Noticias y eventos

| Fuente | Acceso / límites publicados | Uso previsto y cautelas |
|---|---|---|
| Marketaux | Free: 100 requests/día, 3 artículos por petición; Basic $24/mes (mensual) o $29 listado según modalidad; Standard $49; Pro $99. Global, 80+ mercados, 5.000+ fuentes, 30+ idiomas según proveedor. | Candidato práctico para ingestión y entidades; entrega snippet y enlaces, no asumir texto completo ni derechos de redistribución. |
| Finnhub | Cuotas/planes por confirmar. | General news, company news, press releases; cobertura de company-news documentada como Norteamérica en OpenAPI. |
| FMP | Free 250 llamadas/día; noticias listadas en planes de pago. | Probar endpoint, universo, timestamps y condiciones de uso. |
| GDELT Project | Datasets declarados gratuitos para uso académico, comercial y gubernamental; APIs DOC/GEO/TV disponibles. | Descubrimiento global y señales de contexto; no sustituye fuente primaria. Citar GDELT; comprobar latencia, límites y estabilidad del endpoint concreto. |
| Comunicados IR, reguladores y bolsas | Variable; muchas fuentes primarias son públicas. | Prioridad para confirmar hechos. Respetar condiciones de cada sitio y no scrapear contenido protegido. |

Fuentes oficiales:
- Marketaux: https://www.marketaux.com/pricing ; https://www.marketaux.com/faq
- GDELT: https://www.gdeltproject.org/about.html ; https://www.gdeltproject.org/data.html
- Finnhub: https://finnhub.io/docs/api
- FMP: https://site.financialmodelingprep.com/developer/docs

## 5. Filings y fuentes primarias
- SEC EDGAR APIs: `https://data.sec.gov/submissions/CIK##########.json` y `https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json`. No requieren API key. Incluyen historial de submissions y datos XBRL de filings. Límite publicado: máximo 10 requests/segundo por usuario; declarar User-Agent identificable. Los filings suelen estar disponibles en sec.gov en 1–3 minutos desde timestamp EDGAR, sujeto a variación.
- Europa: estudiar ESMA/ESEF, registros nacionales y páginas de relaciones con inversores por mercado. No se ha validado una API paneuropea gratuita equivalente a SEC EDGAR.
- Bolsas y reguladores: evaluar comunicados, suspensiones, corporate actions y calendarios por jurisdicción.

Fuentes:
https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data
https://www.sec.gov/search-filings/edgar-application-programming-interfaces
https://www.sec.gov/about/developer-resources

## 6. Protocolo de pruebas prácticas
Para cada proveedor, usar mismo conjunto de instrumentos (p. ej. AAPL, MSFT, NVDA, SAP XETRA, ASML Euronext, SAN BME; ETF USA/EU y BTC/USD, ETH/USD) y mismos intervalos temporales.
1. Resolver símbolos y bolsa/MIC; detectar cobertura real.
2. Consultar EOD de 5 años, intradía de 1 minuto y quote/snapshot.
3. Registrar timestamp de mercado, timestamp de respuesta, latencia, timezone y retraso declarado.
4. Comparar OHLCV con fuente de referencia; investigar discrepancias y ajustes corporativos.
5. Probar activos deslistados, cambios de ticker, splits y dividendos.
6. Medir llamadas consumidas y créditos por endpoint/símbolo.
7. Probar news search, filtros por entidad/idioma, duplicados, timestamps, enlaces y snippets.
8. Verificar persistencia/caché y uso en LLM bajo términos del proveedor.
9. Pedir por escrito licencia para tres usuarios, display autenticado, alertas, históricos y señales derivadas.
10. Guardar respuestas de prueba (sin secretos), fecha, versión de endpoint y script reproducible.

## 7. Coste estimado: escenarios, no presupuesto
- Prototipo individual de datos diarios: potencialmente 0 €/mes con SEC + GDELT + free tiers, pero límites de llamadas y licencias hacen que no equivalga al producto de tres usuarios.
- Mercado global EOD: EODHD desde $19.99/mes como referencia personal publicada; no asumir que permite compartir.
- Datos intradía multi-mercado: EODHD $29.99/mes personal o Twelve Data Pro desde $99/mes según modalidad/mercados; licencia comercial puede elevar el coste.
- Noticias: Marketaux Free o Basic $24/mes mensual.
- FMP Starter desde $19/mes anual, pero global completo sólo Ultimate $99/mes anual en página consultada.
- Infraestructura, email, hosting, base de datos y licencias comerciales de exchange aún no presupuestados.

**Conclusión provisional:** el coste de API personal no es el coste de un servicio para tres usuarios. No hay todavía un stack que pueda declararse viable y licenciado a 0–30 €/mes.

## 8. Pendientes antes de seleccionar
- Cotizaciones comerciales/licencias para tres usuarios.
- Cobertura europea por bolsa y ETF.
- Frescura real y uso de endpoints intradía.
- Licencia de datos derivados y visualización.
- Retención y backtesting histórico.
- Fuentes de noticias completas y condiciones de reutilización.
- Pruebas con credenciales de prueba y dataset común.


---

## 9. Auditoría de licencias para el caso real (24-11-2026)

### 9.1 Caso de uso que debe autorizarse

Tres familiares adultos, personas físicas y de confianza, sin empresa, clientes, cobro ni ánimo de lucro. Un backend centralizado consulta los proveedores y alimenta un dashboard web autenticado al que acceden los tres con usuarios propios. Se pretende mostrar cotizaciones e históricos, gráficos e indicadores; publicar señales comunes y estadísticas de backtesting; conservar datos para reproducibilidad; enviar alertas a los tres por Telegram y resúmenes por email; y procesar noticias/datos con IA/LLM.

**No es equivalente a tres usos personales independientes.** Si una persona obtiene los datos y los presenta, envía o genera señales para las otras dos, hay acceso de terceros/redistribución según varias políticas expresas. El carácter familiar, gratuito, privado, autenticado o sin ánimo de lucro no crea por sí mismo una excepción. Las licencias de los exchanges pueden imponer obligaciones adicionales y prevalecer sobre la licencia del agregador.

Leyenda: **No permitido en plan personal** = la documentación lo excluye expresamente; **Permitido sólo para uno** = se admite para el titular, no para compartir; **Condicionado/ambiguo** = requiere respuesta escrita y/o licencia de mercado; **No verificado** = no se ha encontrado evidencia oficial suficiente. Esta matriz no es dictamen jurídico.

### 9.2 Matriz por proveedor — uso compartido y derechos

| Proveedor | Tres usuarios / dashboard | Cotizaciones e históricos compartidos | Derivados, señales y backtesting | Almacenamiento histórico | Telegram/email | IA/LLM | Resultado para el caso |
|---|---|---|---|---|---|---|---|
| **EODHD** | **No permitido en personal**: un usuario; excluye familia/grupos y apps para otros, aunque sean privadas, gratuitas o autenticadas. | No permitido en personal, incluso gráficas, informes o capturas. | Cálculos, indicadores, señales y backtests sí para uso exclusivo del titular; compartirlos requiere evaluación/licencia. | Sí para el titular: datos descargados, bases, normalizados y backups; conservación después de cancelar permitida. | Enviar datos/resultados a familiares cambia el uso y no está cubierto. | Sí con ChatGPT/Claude del titular para análisis privado; no compartir datos ni resultados ni crear bot/servicio para grupo. | Descartar plan personal. Preguntar por licencia comercial/grupal concreta. |
| **Twelve Data** | Planes individuales descritos como personales/internos; no autorizan redistribución ni display comercial a terceros. «Authorized Users» y uso interno no resuelven expresamente tres familiares sin entidad. | Display/redistribución requiere tier, add-on o acuerdo; fuera de EE. UU. hay aprobaciones/licencias adicionales. | Señales/indicadores derivados permitidos si no reconstruyen el dato original; el uso compartido de los resultados debe quedar autorizado. | Retención limitada por tier, add-ons y proveedor subyacente; al terminar, borrar datos en 30 días según términos consultados. | No asumir que una alerta a otros dos es «internal use»; pedir autorización expresa. | Pro plan menciona asistentes IA internos; no confirma envío a LLM externo ni salidas compartidas. | Candidato sólo si cotiza por escrito acceso privado de 3 personas, datos EU y derivados. |
| **FMP** | **No permitido en plan individual**: licencia sólo para beneficio propio; prohíbe mostrar, distribuir o permitir acceso a otras personas. | No permitido; incluye datos de mercado y outputs que contengan una parte sustancial de los datos. | Prohíbe proporcionar análisis, señales, recomendaciones o resultados derivados a otros, incluso gratis. | No crear archivo/base sustitutiva; retención/caché de grandes conjuntos o outputs sustanciales restringida. | No cubierto si los destinatarios son los otros familiares. | Política permite IA para análisis personal individual; prohíbe que IA genere beneficio, servicio o output para otra persona. También prohíbe entrenamiento/mejora de modelos con los datos. | Descartar plan individual. Solicitar contrato comercial/enterprise para 3 usuarios y aclarar IA. |
| **Massive (antes Polygon)** | **No permitido en individual**: sólo uso personal; prohíbe compartir información o crear servicios para otros. | No permitido; mostrar datos a usuarios de una app/dashboard se considera redistribución. | Sólo conservar análisis propios que no contengan ni permitan reconstruir/sustituir los datos; señales compartidas requieren acuerdo. | Durante licencia, sí; al terminar o perder derecho, borrar datos y cachés en 30 días. Mantener resultados propios no reconstruibles. | No autorizado en plan individual si expone información/resultados a terceros. | Herramientas externas pueden procesar sólo en nombre del titular, dentro de sus derechos; no usar datos para fines propios ni hacerlos accesibles a otros. Entrenamiento IA/ML prohibido salvo permiso expreso y derechos de proveedores terceros. | Descartar plan individual. Consultar licencia Business y derechos de exchanges. |
| **Alpaca** | No aprobado. Términos de market data exigen acuerdos de suscriptor y prohíben reproducción/distribución/explotación sin consentimiento escrito. | Depende del feed y del acuerdo de datos de mercado; SIP y exchanges requieren acuerdos/clasificación. | No hay permiso general confirmado para señales/derivados compartidos; solicitar autorización. | No se ha verificado un derecho general de archivo/backtesting compartido. | No se ha verificado permiso para distribuir datos por canales externos. | No se ha localizado cláusula suficiente sobre LLM; no asumir permiso. | Sandbox IEX: documentación histórica indica redistribución para pruebas, no asumir que habilita producción. Producción requiere tratar con ventas/exchanges. |
| **Finnhub** | **No permitido sin aprobación escrita**: todos los planes publicados son personales salvo indicación expresa; plan personal no puede usarse por una empresa ni internamente sin permiso. | Prohíbe redistribuir o compartir acceso a datos con terceros sin autorización escrita. | Prohíbe expresamente compartir derivados de datos con terceros sin autorización escrita. | Exige borrar todos los datos cuando termina la suscripción. | Compartir alertas con datos/derivados a familiares necesita aprobación escrita. | No se ha encontrado permiso específico para IA; cláusula de derivados y terceros hace imprescindible consultarlo. | Descartar plan personal salvo aprobación escrita. |
| **Alpha Vantage** | Licencia de plataforma personal/no comercial; considera comercial proporcionar información directa o indirectamente a otras personas, aunque sea fuera de la industria de valores. | No se encuentra autorización para display/redistribución a otros. | Investigación, análisis y testing individuales parecen uso personal; compartir señales/resultados no queda autorizado. | No hay política clara de retención histórica en términos consultados. | No autorizado por el texto general para acceso indirecto de terceros. | No se encontró política específica; tratar como no autorizado hasta confirmación. | No sirve el plan personal para el dashboard compartido sin acuerdo escrito. |
| **Stooq** | **No verificado**: no se ha localizado una licencia/API oficial suficientemente clara. | Desconocido. | Desconocido. | Desconocido. | Desconocido. | Desconocido. | No usar en producción ni asumir que gratuito equivale a libre reutilización. Solicitar términos escritos y origen/licencias de datos. |

**Lecturas oficiales determinantes:**

- EODHD — uso personal: https://eodhd.com/help/personal-use (en particular, uso individual, familia, dashboards, derivados y outputs compartidos); almacenamiento: https://eodhd.com/help/storage ; IA/cloud: https://eodhd.com/help/ai-tools . Las FAQ son explícitas: incluso un dashboard privado con usuarios registrados y sin ánimo de lucro no es uso personal; backtests y derivados se conservan sólo si son del titular y no se comparten.
- Twelve Data — términos: https://twelvedata.com/terms ; matriz de uso personal/comercial (22-10-2026): https://support.twelvedata.com/en/articles/5332349-commercial-and-personal-usage . Distingue display, redistribución, derivados no reversibles, uso interno y licencias de exchange.
- FMP — términos efectivos 17-11-2026: https://site.financialmodelingprep.com/terms-of-service . Incorporan Acceptable Data Use Policy, AI Use Policy y Market Data Terms; prohibición de compartir datos y derivados con terceros y permiso de IA limitado al análisis individual.
- Massive — términos individuales y de datos de mercado, actualizados 03-11-2026: https://massive.com/legal/individuals-terms-of-service ; https://massive.com/legal/market-data-terms-of-service ; explicación de redistribución: https://massive.com/knowledge-base/article/how-can-i-redistribute-massives-market-data . Incluyen almacenamiento y borrado en 30 días al terminar la licencia, resultados no reconstruibles e IA sólo como procesador por cuenta del usuario.
- Alpaca — acuerdos y disclosures: https://alpaca.markets/disclosures ; términos: https://files.alpaca.markets/disclosures/library/TermsAndConditions.pdf ; diferencia de feeds: https://alpaca.markets/support/data-provider-alpaca . Documentación del sandbox: https://docs.alpaca.markets/docs/about-market-data-api (la excepción de redistribución indicada para sandbox no se debe extrapolar a producción).
- Finnhub — términos oficiales: https://finnhub.io/terms-of-service ; pricing: https://finnhub.io/pricing . Los términos prohíben compartir datos o derivados sin aprobación escrita y obligan a borrar los datos al finalizar suscripción.
- Alpha Vantage — términos oficiales: https://www.alphavantage.co/terms_of_service/ ; FAQ/cuotas: https://www.alphavantage.co/support/ . Define como comercial el uso que permite a otros acceder directa o indirectamente a la información.
- Stooq — https://stooq.com/ . No se ha encontrado una licencia oficial clara que conceda los derechos necesarios; la inaccesibilidad/ausencia de términos legibles no equivale a permiso.

### 9.3 Noticias y eventos: derechos distintos de los datos de mercado

| Fuente | Evidencia y alcance | Decisión provisional |
|---|---|---|
| **GDELT** | Términos oficiales permiten uso y redistribución ilimitados, también comercial, sin coste, con cita y enlace al proyecto: https://www.gdeltproject.org/about.html . Datos descargables y documentación: https://www.gdeltproject.org/data.html . | Fuente preferente para metadatos/eventos, temas, tono y URLs. La autorización sobre datasets GDELT **no concede derechos sobre el texto completo, imágenes o contenido de las noticias originales**. Guardar metadatos propios y enlazar a la fuente; evitar almacenar/republicar artículos completos. |
| **Marketaux** | API devuelve título, descripción, snippet, URL, imagen, idioma, fecha y fuente: https://www.marketaux.com/documentation . FAQ indica que sólo proporciona snippet breve y enlace: https://www.marketaux.com/faq . TOS web (10-01-2021) limita el contenido del sitio a uso personal/no comercial y prohíbe acceso automatizado al sitio: https://www.marketaux.com/tos . No queda suficientemente descrita la licencia de API para un dashboard privado compartido. | No asumir que el plan API permite redistribuir snippets, imágenes o contenido a tres usuarios. Consultar licencia API, uso automatizado, almacenamiento y derechos de derivados/LLM. |
| **Finnhub / FMP** | Sus restricciones generales de datos y derivados aplican también a endpoints de noticias/datos de terceros; además pueden existir derechos de editor/licenciante. | No aprobar por el mero hecho de que el endpoint esté disponible. Exigir confirmación por tipo de contenido y jurisdicción. |
| **Comunicados IR, reguladores, bolsas** | Fuente primaria, pero cada documento/sitio conserva sus propios términos, copyright, restricciones de scraping y límites. SEC EDGAR publica APIs y fair-access policy: https://www.sec.gov/search-filings/edgar-application-programming-interfaces y https://www.sec.gov/about/developer-resources . | Priorizar hechos y metadatos; respetar condiciones de cada fuente y no republicar contenido protegido sin licencia. |

### 9.4 Distinciones que no deben mezclarse

- **Personal / non-professional:** clasificación del suscriptor (persona física y uso propio); no significa permiso para compartir con familiares.
- **No comercial / gratuito:** describe propósito o ausencia de ingresos; no elimina derechos de exchanges ni prohibiciones de display/redistribución.
- **Internal use:** término contractual; no asumir que incluye tres personas sin una entidad o que permite una app familiar. Preguntar quién puede ser «Authorized User» y si se necesita cuenta por usuario.
- **Display:** que el dashboard esté autenticado no evita que el dato se muestre a terceros.
- **Redistribution:** puede incluir cotizaciones, históricos, gráficos, alertas, informes, screenshots y datos enviados por mensajería.
- **Derived data:** indicadores, scores, rankings, señales y backtests sólo quedan fuera de redistribución cuando el contrato lo permite y no revelan, permiten reconstruir ni sustituyen los datos de origen. Las reglas difieren por proveedor.
- **Non-display use:** cálculo automatizado/backtesting/IA puede tener licencia propia aunque nadie vea la cotización.
- **Storage:** poder descargar/guardar para uso propio no autoriza compartir el archivo; las políticas de retención y borrado al cancelar difieren.
- **IA/LLM:** distinguir inferencia puntual, uso de una API de modelo, retención de prompts, entrenamiento y publicación de outputs. Que el proveedor de datos permita usar ChatGPT para análisis personal no permite un asistente para tres usuarios. El contrato del proveedor LLM también debe impedir entrenamiento/retención no deseados cuando corresponda.
- **Alertas:** enviar un mensaje con precio, variación, gráfico, resumen o señal a otros familiares también es una forma de mostrar/redistribuir información; no sólo importa el dashboard.

### 9.5 Consultas escritas preparadas (NO enviadas)

Enviar desde el canal oficial de ventas/licencias, sin adjuntar claves ni datasets. Pedir respuesta que identifique el plan, coste, derechos, fuentes de exchange y cláusulas aplicables. No aceptar una respuesta comercial genérica como sustituto de la autorización contractual.

**Plantilla común (adaptar a cada proveedor):**

> Subject: Written licensing clarification — private dashboard for three family members in Spain
>
> We are three adult family members (three natural persons), acting privately and without any company, clients, fees, subscriptions, advertising, commercial activity or profit motive. We are considering one centrally operated, password-protected web dashboard, with three named individual logins and access restricted to these three people. One backend would retrieve data through one API integration; the three users would not receive API credentials.
>
> Please confirm in writing whether the proposed use is permitted under any personal/non-professional plan or requires a business/commercial/team licence, even though there is no legal entity or commercial purpose.
>
> Please answer separately for:
> 1. Displaying real-time, delayed and end-of-day quotes, OHLCV history, charts and fundamentals to all three users.
> 2. Central caching/storage of raw and adjusted data, local database, backups, long-term retention, and use of historical data for backtesting after subscription cancellation.
> 3. Calculated indicators, aggregates, scores, rankings, entry/exit levels, proprietary buy/avoid signals, backtest statistics and performance reports. Which outputs are considered derived data, and what non-reconstruction threshold applies?
> 4. Sending alerts containing prices, percentage changes, charts, summaries or signals to the same three users via a private Telegram group and email.
> 5. Sending data/news metadata/snippets to an external LLM/API strictly for extraction, classification, entity resolution and summarisation. Please specify whether inference is permitted, whether prompts/outputs may be retained, and whether model training is prohibited/allowed.
> 6. Whether the three users must each register, sign exchange subscriber declarations, pay separate user/display fees or be classified as professional/non-professional. Please identify every underlying exchange/data licensor and any pass-through terms.
> 7. Whether the rights survive termination for historical raw data and derived outputs, and what must be deleted and when.
>
> Please provide the exact plan/add-ons, all-in monthly and annual price, per-user/exchange fees, applicable market-data agreements, and the contractual clause or written addendum authorising this exact three-person use. A response that only confirms “non-commercial use” would not resolve our question.

**Preguntas específicas:**
- **EODHD** (sales@eodhistoricaldata.com): su FAQ excluye expresamente compartir con familiares y un dashboard para otros. Preguntar por licencia comercial/grupal para 3 personas físicas, sin entidad, y si los outputs de señales pueden compartirse. No pedir una excepción informal al plan personal.
- **Twelve Data** (support@twelvedata.com / ventas): aclarar si familiares son «Authorized Users» o terceros; tier mínimo, Redistribution Rights Add-On, precio para datos europeos y permisos separados por bolsa; derecho de alertas y LLM.
- **FMP** (info@financialmodelingprep.com): solicitar acuerdo enterprise que derogue expresamente las prohibiciones de distribución de señales y display de Market Data; aclarar AI Use Policy, datos de terceros y conservación.
- **Massive** (support@massive.com / sales): pedir Business plan y autorización de display a tres usuarios; especificar outputs derivados, retención/backtesting, canales externos, procesamiento LLM y licencias de cada exchange.
- **Alpaca** (sales/contacto de market data): preguntar por feed de producción y acuerdos SIP/CTA/UTP, display a tres personas, subscriber reporting, derivados, retención y uso de noticias/IA. No extrapolar la excepción de sandbox.
- **Finnhub** (support@finnhub.io): pedir autorización escrita expresa para datos y derivados compartidos con dos familiares, notificaciones, archivo histórico y LLM; confirmar borrado al cancelar y precio.
- **Alpha Vantage** (premium@alphavantage.co): solicitar acuerdo escrito que permita el acceso indirecto de dos personas más y display de datos/derivados; confirmar derechos de almacenamiento, alertas y LLM.
- **Stooq**: localizar contacto oficial válido y pedir términos/licencia de API, origen de los datos, redistribución/display, histórico y uso de derivados/IA antes de cualquier consumo automatizado.
- **Marketaux** (contacto oficial del sitio): pedir licencia específica de API para uso automatizado y display de títulos/descripciones/snippets/URLs a tres usuarios, almacenamiento, resúmenes derivados y procesamiento LLM.

### 9.6 Conclusión y shortlist del escenario anterior de tres usuarios (SUPERADA)

> **Histórico, no vigente.** La conclusión de esta sección corresponde al escenario de tres familiares y queda sustituida por la sección 10, tras la decisión del 24-11-2026 de usar Market Radar exclusivamente con un usuario.


1. **No hay proveedor de mercado validado para el dashboard compartido de tres personas bajo una licencia personal.** EODHD, FMP, Massive y Finnhub lo excluyen expresamente; Alpha Vantage no permite el acceso indirecto de otros; Alpaca requiere más validación; Twelve Data es el candidato más interesante para negociar derechos de display/derivados, pero no hay autorización confirmada.
2. **EODHD destaca para investigación privada individual** (históricos, backtesting, derivados conservables y uso personal con LLM), pero su FAQ hace inviable trasladar ese plan a los tres.
3. **Massive y FMP tienen políticas recientes y explícitas** sobre terceros, IA, derivados y retención; no deben evaluarse sólo por precio/API.
4. **GDELT sí ofrece una base reutilizable** para metadatos/eventos con atribución, pero no libera derechos de artículos subyacentes.
5. **Marketaux queda bloqueado por falta de licencia API suficientemente clara** para la distribución a tres personas.
6. La solución podría ser una licencia de display de proveedor, tres suscripciones personales independientes sin compartir datos (no resuelve señales comunes) o rediseñar el producto para que sólo una persona vea los datos y los demás reciban contenido que el proveedor autorice expresamente. No asumir que la tercera opción es válida sin autorización.
7. No se debe estimar el coste final usando precios de planes personales: pedir precio total para tres usuarios y derechos de exchange incluidos.

**Estado:** investigación documental reforzada, no asesoramiento jurídico. Las páginas oficiales reflejan términos consultados el 24-11-2026; deben releerse antes de contratar. Ninguna consulta ha sido enviada y ningún proveedor está aprobado.


---

## 10. Cambio de alcance: uso estrictamente individual (24-11-2026)

El usuario ha decidido que Market Radar será para **uso privado de una sola persona: el propio usuario**. Se abandona el requisito de tres familiares, el dashboard multiusuario y cualquier acceso/redistribución a familiares. Esta decisión sustituye el supuesto de tres usuarios de las secciones 9.1–9.6 para la selección de licencias; se conserva esa auditoría como histórico y evidencia de por qué se descartó el escenario compartido.

### 10.1 Alcance de licencia actualizado

- Un único titular, persona física, que consulta el dashboard autenticado.
- No habrá otros usuarios, cuentas familiares, clientes, invitados ni acceso compartido.
- Datos de mercado e históricos se consultan y almacenan para análisis propio, indicadores, señales y backtesting del titular, sujeto a las condiciones concretas del proveedor.
- Alertas Telegram y email se enviarán únicamente al titular. La entrega a plataformas externas sigue sujeta a las condiciones del proveedor de datos, del canal y del servicio de mensajería.
- Procesamiento IA/LLM sólo como herramienta de análisis del titular; comprobar las condiciones sobre proveedores externos, retención de prompts, entrenamiento y transferencia de datos.
- No se compartirán cotizaciones, históricos, gráficos, señales, informes ni outputs derivados con familiares ni terceros. Tampoco se publicarán.
- No se compartirán credenciales/API keys.

### 10.2 Consecuencias para la evaluación

1. EODHD personal pasa a ser un candidato especialmente relevante: su documentación de uso personal permite análisis, indicadores, backtesting y uso privado con IA del titular, sujeto a sus límites y sin compartir resultados.
2. Massive, FMP, Finnhub y Alpha Vantage deben reevaluarse desde sus condiciones de uso individual; las prohibiciones de redistribución dejan de ser un bloqueo si no hay terceros, pero permanecen restricciones de IA, almacenamiento, retención y outputs.
3. Twelve Data debe evaluarse para uso individual/internal use y derivados; no hace falta negociar display multiusuario, pero sí confirmar el derecho de uso personal y las restricciones de sus fuentes subyacentes.
4. Alpaca debe evaluarse como feed personal de producción, diferenciando IEX/SIP, clasificación del suscriptor y términos de exchange.
5. Stooq sigue sin aprobarse hasta encontrar condiciones oficiales claras.
6. GDELT sigue siendo candidato para metadatos de eventos con atribución; Marketaux requiere comprobar licencia API, aunque no exista display a terceros.
7. **Uso individual no equivale a permiso ilimitado**: respetar cuotas, retención, almacenamiento, IA, límites de descarga, no redistribución y condiciones de exchanges.
8. Los precios de planes personales vuelven a ser una referencia útil, pero no se aprueba ningún plan hasta comparar cobertura, frescura, histórico y coste con el universo real.

### 10.3 Matriz de decisión a rehacer

La siguiente iteración debe puntuar proveedores para este escenario individual, no para tres usuarios. Separar:
- uso personal del dashboard por el titular;
- ingesta/caché e histórico local;
- indicadores, señales y backtesting no compartidos;
- alertas dirigidas sólo al titular;
- procesamiento IA/LLM como herramienta personal;
- retención y derechos al cancelar;
- restricciones de exchange, mercado y feed.

No enviar las consultas preparadas para licencias de tres usuarios: quedan obsoletas para el alcance vigente. Sólo consultar al proveedor si la documentación pública no resuelve una cláusula material.


---

## 11. Reevaluación para uso individual y estrategia gratuita-first (24-11-2026)

**Prioridad confirmada por el usuario:** coste inicial de **0 €**. Durante el prototipo y la primera puesta en marcha se buscarán exclusivamente fuentes y servicios gratuitos. No contratar planes ni iniciar pruebas que consuman cuotas/credenciales sin autorización expresa. Los planes de pago sólo se reconsiderarán cuando el sistema gratuito esté funcionando y existan limitaciones medidas que justifiquen el gasto.

Esta sección y las conclusiones siguientes sustituyen cualquier shortlist o coste orientado al escenario de tres usuarios. Las secciones 9.1–9.6 se conservan únicamente como histórico.

### 11.1 Hallazgos gratuitos verificados en documentación oficial

| Fuente | Acceso gratuito publicado | Utilidad real y límites | Estado para el proyecto |
|---|---|---|---|
| **EODHD** | 20 llamadas/día; un año de histórico EOD. Demo pública con histórico completo para un conjunto pequeño de símbolos. | Multi-activo y multi-mercado en catálogo, pero free insuficiente para ingesta amplia; confirmar cobertura efectiva por símbolo. Plan personal documenta uso propio y análisis, pero verificar almacenamiento, IA y retención por separado. | Candidato para evaluar con demo y una prueba pequeña autorizada; no base única del sistema. |
| **Twelve Data Basic** | 8 créditos/minuto y 800/día; 8 créditos WebSocket de prueba. | Datos en tiempo real para acciones/ETF USA, FX y cripto; no incluye el catálogo global de EOD/Europa del plan Grow ni datos europeos en tiempo real del Pro. Endpoints tienen pesos distintos por símbolo. | Útil para prototipo limitado USA/FX/cripto; cobertura europea gratuita insuficiente. |
| **FMP Basic** | 250 llamadas/día; datos USA; cinco años históricos de acciones; endpoints premium excluidos. | Puede aportar EOD y fundamentales básicos USA. Términos vigentes limitan a uso personal y restringen acumulación/almacenamiento que cree un archivo sustitutivo; hay que comprobar endpoint y retención permitidos. | Candidato para fundamentals/EOD USA, sujeto a revisión de cada endpoint y política de almacenamiento. |
| **Massive Stocks Basic** | 5 llamadas/minuto; dos años históricos; datos EOD y cobertura de acciones USA publicada como 100%. | Acceso personal individual. Términos de mercado permiten descargar/almacenar para uso propio durante la licencia; al terminar, borrar datos y cachés en un máximo de 30 días. IA/servicios externos sólo como procesadores por cuenta del titular; entrenamiento prohibido salvo permiso. | Candidato experimental USA EOD, muy limitado por cuota; no apto como fuente única. |
| **Alpaca Basic** | Gratis; acciones/ETF USA; IEX en tiempo real; histórico desde 2016, pero la API free limita la consulta al tramo reciente (últimos 15 minutos, según tabla oficial); 200 llamadas/minuto. | IEX no representa el volumen consolidado SIP/CTA/UTP. No cubre Europa. | Útil para feed USA en tiempo real de alcance IEX, no como referencia de mercado consolidado ni para histórico libre amplio. |
| **Alpha Vantage** | 25 llamadas/día para la mayoría de datasets. | Datos USA en tiempo real y retrasados 15 minutos son premium por licencias de mercado. Excepción de volumen ilimitado sólo para proyectos open-source/educativos verificados; no asumir que un proyecto privado cumple. | Fuente secundaria para consultas puntuales, no ingesta operativa. |
| **Finnhub** | La cuota y los derechos concretos del plan gratuito no han quedado suficientemente verificados en esta revisión. | La documentación ofrece endpoints de mercado, fundamentals y noticias, pero no se da por supuesto que todos estén disponibles en free ni que permitan almacenamiento/LLM. | Pendiente de verificación; no incluir aún en shortlist gratuito. |
| **Stooq** | Acceso web a datos históricos; no se ha verificado una API gratuita estable ni licencia clara para automatización/almacenamiento. | No asumir que la disponibilidad pública equivale a permiso para extracción automatizada o reutilización. | Sólo contraste manual/experimental hasta aclarar licencia y API. |
| **SEC EDGAR** | APIs públicas sin API key; límite fair-access de 10 solicitudes/segundo y obligación de uso responsable/User-Agent. | Filings, submissions y XBRL de emisores obligados a reportar en EE. UU.; no es un proveedor de cotizaciones ni cubre Europa. | Fuente primaria prioritaria y gratuita para fundamentales/eventos USA. |
| **GDELT** | Datasets/APIs abiertos y gratuitos; los datasets se pueden reutilizar y redistribuir con cita y enlace al proyecto. GDELT 2.0 actualiza sus streams principales cada 15 minutos. | Metadatos/eventos y descubrimiento global; no concede derechos sobre artículos originales enlazados. Volumen y ruido exigen filtrado. | Candidato fuerte para descubrimiento de eventos y contexto, no sustituto de fuente primaria. |
| **Marketaux Free** | 100 solicitudes/día y hasta 3 artículos por solicitud; devuelve snippets y enlaces. | Cobertura global anunciada; no se ha resuelto con suficiente claridad la licencia de almacenamiento, automatización y uso de snippets con LLM. | Candidato condicionado a revisión de términos antes de usarlo en producción. |

### 11.2 Lectura crítica: no existe todavía una solución gratuita completa

- **EE. UU.**: hay varias opciones gratuitas para EOD, fundamentals/filings y un feed IEX; cada una tiene límites distintos. SEC EDGAR + GDELT son los componentes gratuitos con derechos públicos más claros para filings y metadatos de eventos.
- **Europa**: no se ha identificado una fuente gratuita única, con cobertura amplia, histórico de cinco años, API automatizable y derechos claros de uso personal. La cobertura europea es el principal hueco del stack gratuito.
- **Intradía**: los tiers gratuitos son muy limitados o no ofrecen una visión consolidada. No presentar IEX como mercado USA completo ni usar datos retrasados como si fueran ejecutables.
- **Histórico**: EODHD Free sólo un año; Massive Basic dos años; FMP Basic cinco años USA según la página oficial. Ninguno resuelve por sí solo cinco años globales USA+Europa+ETF+cripto.
- **Fundamentales**: SEC EDGAR es valioso para emisores USA; FMP Free puede complementar, con restricciones de endpoints y almacenamiento. Para Europa habrá que acudir a informes corporativos y fuentes regulatorias por emisor/país, cuya automatización debe revisarse.
- **Noticias**: GDELT es la base abierta más clara para metadatos; Marketaux añade una API sencilla pero queda condicionado por sus términos y límites.

### 11.3 Restricciones contractuales relevantes identificadas

- **FMP**: los términos individuales publicados prohíben acumular datos mediante API en volúmenes/frecuencias que excedan el plan o crear un archivo/base de datos sustitutivo. No diseñar una descarga masiva histórica o caché permanente sin aclarar el alcance permitido.
- **Massive**: los términos individuales y de market data aplican también al acceso gratuito. Permiten análisis personal y almacenamiento de la información licenciada, pero al acabar el derecho de acceso exigen detener el uso y borrar datos/cachés en un máximo de 30 días. Los análisis propios no reconstruibles pueden conservarse. No entrenar modelos IA/ML con la información salvo permiso expreso.
- **Twelve Data**: Basic se limita a uso interno no-display y tiene cuotas muy bajas. Las condiciones de uso personal permiten herramientas internas y derivados no reversibles, pero el acceso efectivo a mercados depende del tier y de licencias de exchange.
- **EODHD**: 20 llamadas diarias y un año EOD en free; demo sirve para evaluar un conjunto pequeño sin consumir la cuota propia. No extrapolar la demo a cobertura universal ni a producción.
- **Alpaca**: IEX es una fuente parcial, no el SIP consolidado; los derechos del feed y el alcance de datos deben indicarse en la interfaz y en el análisis.
- **Marketaux**: la página de precios/FAQ confirma cuota y snippets, no resuelve por sí sola todos los derechos de almacenamiento, IA y retención.
- **SEC/GDELT**: respetar fair access, atribución y límites; GDELT no otorga derechos sobre el contenido original de los medios.

### 11.4 Fuentes oficiales revisadas el 24-11-2026

- EODHD planes: https://eodhd.com/help/plans ; histórico/free: https://eodhd.com/financial-apis/api-for-historical-data-and-volumes ; límites: https://eodhd.com/help/limits
- Twelve Data precios: https://twelvedata.com/pricing ; uso personal/comercial: https://support.twelvedata.com/en/articles/5332349-commercial-and-personal-usage
- FMP precios: https://site.financialmodelingprep.com/pricing-plans ; FAQ free: https://site.financialmodelingprep.com/faqs ; términos: https://site.financialmodelingprep.com/terms-of-service
- Massive planes: https://massive.com/pricing?product=stocks ; términos individuales: https://massive.com/legal/individuals-terms-of-service ; términos de datos: https://massive.com/legal/market-data-terms-of-service
- Alpaca market data: https://docs.alpaca.markets/us/v1.1/docs/about-market-data-api ; feed: https://alpaca.markets/support/data-provider-alpaca
- Alpha Vantage cuotas/licencias: https://www.alphavantage.co/support/api-key/
- Finnhub: https://finnhub.io/docs/api ; términos: https://finnhub.io/terms-of-service (pendiente de verificación específica de free)
- Stooq: https://stooq.com/ (no se ha localizado licencia/API suficientemente clara)
- SEC fair access: https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data ; APIs: https://www.sec.gov/about/developer-resources
- GDELT uso: https://www.gdeltproject.org/about.html ; datos/actualización: https://www.gdeltproject.org/data.html
- Marketaux precios: https://www.marketaux.com/pricing ; FAQ: https://www.marketaux.com/faq

### 11.5 Shortlist provisional gratuita

1. **SEC EDGAR + GDELT** como base gratuita de filings y descubrimiento de eventos.
2. **FMP Basic** para evaluar fundamentals/EOD USA, con almacenamiento restringido y sólo endpoints incluidos.
3. **Alpaca Basic** para evaluar datos USA IEX en tiempo real, dejando clara su representatividad limitada.
4. **EODHD Free/demo** para evaluar cobertura multi-activo y calidad EOD en un universo reducido.
5. **Twelve Data Basic** como alternativa de prototipo de baja frecuencia para USA/FX/cripto.
6. **Marketaux Free** sólo tras resolver términos de almacenamiento/LLM; **Finnhub y Stooq** quedan pendientes.

Esta shortlist no implica aprobación contractual ni técnica. No se han creado cuentas, usado credenciales, ejecutado llamadas con cuotas ni contratado servicios. La siguiente fase es concretar un universo pequeño de símbolos y una frecuencia de actualización que quepa en las cuotas gratuitas, y luego solicitar autorización antes de ejecutar pruebas reproducibles.


## 12. Universo de prueba y frecuencia para la v1

## Universo inicial de seguimiento — v1 (24-11-2026)

El usuario confirma incluir obligatoriamente NVIDIA, Microsoft y Meta. Se propone el siguiente universo de 12 instrumentos para validar cobertura y diseñar el radar; **no son recomendaciones de compra ni una cartera objetivo**:

| # | Instrumento | Símbolo de referencia | Mercado / función |
|---:|---|---|---|
| 1 | NVIDIA | NVDA | EE. UU.; semiconductores/IA |
| 2 | Microsoft | MSFT | EE. UU.; software/cloud |
| 3 | Meta Platforms | META | EE. UU.; plataformas/publicidad/IA |
| 4 | Amazon | AMZN | EE. UU.; comercio/cloud |
| 5 | Core Natural Resources | CNR | EE. UU.; carbón térmico y metalúrgico; seguimiento de alto riesgo cíclico |
| 6 | ASML | ASML (Euronext Amsterdam) | Europa; semiconductores/equipamiento |
| 7 | SAP | SAP (Xetra) | Europa; software empresarial |
| 8 | Banco Santander | SAN (BME Madrid) | Europa; banca |
| 9 | SPDR S&P 500 ETF Trust | SPY | ETF USA; benchmark de grandes compañías estadounidenses |
| 10 | Vanguard FTSE All-World UCITS ETF | VWCE (Xetra) | ETF UCITS global; benchmark diversificado |
| 11 | Bitcoin | BTC/USD | Cripto |
| 12 | Ethereum | ETH/USD | Cripto |

Los símbolos exactos por proveedor pueden variar; resolver ticker, MIC/bolsa, moneda y tipo de instrumento antes de comparar datos. No confundir el ticker estadounidense CNR con otros instrumentos homónimos.

### Criterio sobre Core Natural Resources (CNR)
CNR se incluye para vigilarla, no como componente «core» ni como apuesta de largo plazo aprobada. Es una compañía expuesta a carbón térmico y metalúrgico, precios de materias primas, demanda de acero/energía, regulación climática, riesgos operativos mineros, transporte, deuda y transición energética. La empresa también explora líneas nuevas (incluidas tierras raras), pero no deben valorarse como negocio consolidado sin evidencia de ingresos, márgenes y escala. Su 10-Q y comunicaciones de 2026 enumeran expresamente volatilidad de precios, demanda, regulación, operaciones, reservas y riesgos de integración. El radar deberá tratarla como caso cíclico/especial y exigir margen de seguridad, balance, generación de caja a través del ciclo y valoración conservadora antes de emitir una señal positiva.

Fuente primaria: SEC, 10-Q de Core Natural Resources para el trimestre finalizado el 30-09-2026: https://www.sec.gov/Archives/edgar/data/1710366/000171036626000068/cnr-20260930.htm ; resultados Q3 2026: https://www.sec.gov/Archives/edgar/data/1710366/000171036626000067/cnrq32026er-exhibit991.htm

### Cadencia operativa v1
- No se exige intradía ni streaming/WebSocket.
- Una ejecución diaria tras el cierre de los mercados correspondientes actualizará precios EOD, fundamentals/noticias disponibles y reglas.
- Segunda ejecución opcional sólo para novedades materiales o alertas de riesgo; no generar mensajes si no cambia la evaluación.
- Para mercados USA y Europa, respetar horarios, festivos y zonas horarias. Cripto opera 24/7, pero la señal diaria debe usar un corte horario definido y consistente.
- Las alertas serán para el titular, máximo orientativo de 1–2 resúmenes al día, con prioridad a cambios de tesis, resultados, eventos relevantes o niveles de entrada/salida. No prometer datos en tiempo real.
- Si una fuente gratuita no aporta precio fresco o histórico suficiente, etiquetar la carencia y abstenerse; nunca presentar dato retrasado como cotización ejecutable.

**Implicación para proveedores gratuitos:** la comparación debe cubrir los 12 instrumentos con una sola actualización EOD diaria, no streaming. Medir número de llamadas/créditos por símbolo, resolución de identificadores y cobertura histórica real. Para la segunda ejecución, preferir sólo fuentes de eventos/noticias y no volver a descargar todo el histórico. No ejecutar estas llamadas hasta autorización expresa.


---

## 13. Matriz documental de cobertura y consumo EOD — 24-11-2026

**Alcance de esta revisión:** documentación pública oficial; no se han ejecutado llamadas API, usado credenciales, creado cuentas ni consumido cuotas. Las cifras son límites publicados y estimaciones teóricas, no resultados de pruebas. Ningún proveedor queda aprobado.

### 13.1 Universo de prueba actualizado

Se sustituye CNR por **Johnson & Johnson (JNJ)**. El objetivo es incorporar salud como sector defensivo y evitar que el único ejemplo no tecnológico sea una minera de carbón de alto riesgo cíclico. CNR no queda descartada para siempre: simplemente deja de ser necesaria en esta primera validación.

| # | Instrumento | Símbolo de referencia | Mercado / sector |
|---:|---|---|---|
| 1 | NVIDIA | NVDA | Nasdaq / semiconductores |
| 2 | Microsoft | MSFT | Nasdaq / software y cloud |
| 3 | Meta Platforms | META | Nasdaq / plataformas y publicidad |
| 4 | Amazon | AMZN | Nasdaq / comercio y cloud |
| 5 | Johnson & Johnson | JNJ | NYSE / salud |
| 6 | ASML | ASML | Euronext Amsterdam / semiconductores |
| 7 | SAP | SAP | Xetra / software empresarial |
| 8 | Banco Santander | SAN | BME Madrid / banca |
| 9 | SPDR S&P 500 ETF Trust | SPY | NYSE Arca / ETF USA |
| 10 | Vanguard FTSE All-World UCITS ETF | VWCE | Xetra / ETF global |
| 11 | Bitcoin | BTC/USD | Cripto |
| 12 | Ethereum | ETH/USD | Cripto |

Este universo sirve para probar cobertura, no representa una cartera diversificada ni una recomendación de compra. Sigue teniendo bastante exposición indirecta a tecnología por las cuatro acciones estadounidenses y los dos ETF.

### 13.2 Identificadores de referencia

Los siguientes símbolos son una primera normalización, no un contrato universal entre proveedores. Los sufijos dependen de cada API.

| Activo | EODHD (formato candidato) | MIC / plaza de referencia | Moneda |
|---|---|---|---|
| NVDA | NVDA.US | XNAS | USD |
| MSFT | MSFT.US | XNAS | USD |
| META | META.US | XNAS | USD |
| AMZN | AMZN.US | XNAS | USD |
| JNJ | JNJ.US | XNYS | USD |
| ASML | ASML.AS | XAMS | EUR |
| SAP | SAP.XETRA | XETR | EUR |
| SAN | SAN.MC | BMEX | EUR |
| SPY | SPY.US | ARCX | USD |
| VWCE | VWCE.XETRA | XETR | EUR |
| BTC | BTC-USD.CC | Mercado cripto agregado; proveedor pendiente | USD |
| ETH | ETH-USD.CC | Mercado cripto agregado; proveedor pendiente | USD |

Evidencia de símbolos EODHD: su API EOD usa `SYMBOL.EXCHANGE`, admite `.AS`, `.XETRA` y `.MC`; la ficha de SAN.MC identifica Madrid/BMEX y la ficha de VWCE.XETRA confirma el ETF en Xetra. El catálogo de instrumentos de cada proveedor debe consultarse antes de cualquier llamada; los fallos de símbolo pueden consumir cuota. Fuentes: https://eodhd.com/financial-apis/api-for-historical-data-and-volumes ; https://eodhd.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours ; https://eodhd.com/financial-summary/SAN.MC ; https://eodhd.com/financial-summary/VWCE.XETRA

### 13.3 Comparativa de cobertura y coste operativo estimado

Supuesto homogéneo: una descarga EOD diaria, una consulta de serie por instrumento cuando el endpoint es individual, sin fundamentals ni noticias en esa misma cifra. Los endpoints agrupados se señalan por separado.

| Proveedor / plan gratis | Cobertura probable en el universo | Consumo EOD estimado | Histórico / frescura publicada | Limitación determinante |
|---|---|---:|---|---|
| **EODHD Free** | Candidato para los 12: acciones USA, ASML, SAP, SAN, SPY, VWCE, BTC y ETH; confirmar los 12 en Exchanges API. | **12 llamadas/día** (una por símbolo) de un máximo de 20; 60% del cupo. | 1 año EOD. | El endpoint EOD sirve un símbolo por request. Demo sólo cubre un conjunto fijo y no demuestra cobertura de los 12. No incluye automáticamente todos los endpoints/fundamentals. |
| **Twelve Data Basic** | Candidato para 6 acciones/ETF USA y 2 cripto; **no asumir cobertura gratuita de las 4 posiciones europeas**. | 8 créditos por ciclo (1 por símbolo en `/time_series`); límite 8/min y 800/día. | Series históricas; datos USA/ETF y cripto en tiempo real según el plan, sujeto al instrumento. | Los 8 símbolos consumen todo el cupo de un minuto; no queda margen para otro endpoint en ese minuto. Europa requiere verificar plan/add-on y derechos de mercado. |
| **FMP Basic** | 6 instrumentos USA (5 acciones + SPY) como base; cripto y Europa quedan condicionados a la disponibilidad efectiva del endpoint Basic. | **12 llamadas/día** si cada símbolo usa una petición EOD; máximo publicado 250/día. | Pricing anuncia EOD y hasta 5 años en Basic; el acceso efectivo a cada endpoint/dataset debe comprobarse. | Hay una discrepancia en la documentación: el plan Basic describe cobertura USA, mientras que el endpoint EOD Light se etiqueta como disponible globalmente. No dar por cubierta Europa sin validación. Términos limitan la acumulación/archivo sustitutivo. |
| **Massive Stocks Basic** | 6 instrumentos USA (5 acciones + SPY). No cubre las 4 posiciones europeas ni debe suponerse que el plan Stocks incluye cripto. | 6 peticiones individuales, por lo que se necesitan al menos 2 minutos a 5 req/min; alternativa: 1 llamada al endpoint de mercado agrupado USA, que devuelve todo el mercado y exige filtrar localmente. | 2 años; EOD disponible después de medianoche ET para el día anterior. | No permite descargar el EOD del mismo día antes de medianoche ET. El endpoint agrupado reduce peticiones, pero descarga mucho más dato del necesario. |
| **Alpaca Basic** | 6 instrumentos USA (5 acciones + SPY). No Europa; cripto debe validarse por separado. | **1 petición agrupada** de barras para los 6 símbolos, dentro de 200 llamadas/min. | Histórico desde 2016; feed IEX en tiempo real. La restricción de los últimos 15 minutos afecta a SIP reciente; barras SIP con más de 15 minutos son accesibles. | Para EOD histórico puede usarse SIP con corte superior a 15 minutos, pero el dato en tiempo real gratuito es IEX, no el mercado consolidado. Especificar siempre `feed`. |
| **Alpha Vantage Free** | Acciones globales potencialmente; ETF VWCE y cripto no quedan validados para este universo. | **12 peticiones/día** si cada instrumento se consulta individualmente; máximo 25/día. | `TIME_SERIES_DAILY` ofrece OHLCV bruto y 25+ años; los datos ajustados requieren otro endpoint cuya disponibilidad gratuita no debe asumirse. | El cupo deja sólo 13 peticiones para cualquier otro endpoint. Datos USA en tiempo real y retrasados 15 minutos son premium. |
| **Finnhub Free** | Cotizaciones USA y algunas funciones auxiliares; no considerar cubiertos los históricos EOD de los 12. | Hasta 12 consultas de quote en teoría; cuota publicada habitualmente 60/min, pero el acceso free a cada endpoint requiere confirmación. | No se ha confirmado acceso gratuito a velas históricas OHLC para este proyecto. | No incluir en el cálculo de ingesta EOD: la evidencia pública consultada no permite asegurar que `stock/candle` y `crypto/candle` estén disponibles en Free. |
| **Stooq** | No validado. | No calculable. | No verificados endpoint, frecuencia ni profundidad. | No usar en automatización hasta localizar API y licencia oficial inequívocas. |

Fuentes oficiales principales:
- EODHD planes, EOD y costes: https://eodhd.com/help/plans ; https://eodhd.com/financial-apis/api-for-historical-data-and-volumes ; https://eodhd.com/help/limits
- Twelve Data Basic y pesos por símbolo: https://twelvedata.com/pricing ; https://support.twelvedata.com/en/articles/5615854-credits ; documentación: https://twelvedata.com/docs
- FMP Basic y EOD Light: https://site.financialmodelingprep.com/pricing-plans ; https://site.financialmodelingprep.com/es/developer/docs
- Massive Stocks Basic, barras individuales y resumen agrupado: https://massive.com/pricing?product=stocks ; https://massive.com/docs/rest/stocks/aggregates/custom-bars ; https://massive.com/docs/rest/stocks/aggregates/daily-market-summary ; disponibilidad tras medianoche ET: https://massive.com/knowledge-base/article/on-the-free-basic-plan-when-can-i-pull-the-previous-trading-days-data
- Alpaca Basic, feeds y llamadas: https://docs.alpaca.markets/us/v1.1/docs/about-market-data-api ; endpoint multi-símbolo: https://docs.alpaca.markets/us/reference/stockbars ; aclaración de SIP y últimos 15 minutos: https://forum.alpaca.markets/t/cant-read-spy-minutes/14293
- Alpha Vantage límites y datos diarios: https://www.alphavantage.co/support/ ; https://www.alphavantage.co/documentation/
- Finnhub endpoints y términos: https://finnhub.io/docs/api ; https://finnhub.io/pricing ; https://finnhub.io/terms-of-service

### 13.4 Qué significan realmente las cuotas

- **EODHD:** una petición HTTP al endpoint EOD de un símbolo equivale a una llamada, incluso si devuelve 404. La consulta de 12 símbolos consumiría 12 de las 20 llamadas diarias, antes de cualquier consulta adicional.
- **Twelve Data:** el coste es por crédito/símbolo y endpoint, no simplemente por petición HTTP. `/time_series` cuesta 1 crédito por símbolo; 8 símbolos en una misma consulta consumen 8 créditos.
- **Massive:** el límite de 5 es por peticiones/minuto. Se puede consultar un ticker por petición o recuperar el mercado USA completo con el endpoint agrupado. La segunda alternativa ahorra llamadas, pero aumenta datos descargados y trabajo local.
- **Alpaca:** el endpoint de barras acepta una lista de símbolos en una sola petición; no debe multiplicarse el consumo por seis si se utiliza correctamente el modo batch.
- **FMP y Alpha Vantage:** sus límites publicados se expresan en peticiones/día; para el cálculo conservador se considera una petición por símbolo. No se ha demostrado un batch EOD que reduzca el coste para este conjunto.

### 13.5 Noticias, eventos y segunda ejecución selectiva

La segunda ejecución no debe volver a descargar las 12 series de precios. Propuesta:
1. Consultar GDELT para descubrir noticias/eventos nuevos, filtrando por entidades y ventana temporal; actualizar metadatos y deduplicar.
2. Confirmar cualquier evento material con fuente primaria: relaciones con inversores, SEC EDGAR para emisores USA, comunicados regulatorios o bolsa correspondiente.
3. Recalcular sólo los activos afectados y sus relaciones; si el evento no cambia la tesis o no hay evidencia, no emitir alerta.
4. Marketaux puede evaluarse como alternativa de noticias (100 solicitudes/día y hasta 3 artículos por petición), pero no usar snippets/guardar contenido ni enviarlo a LLM hasta cerrar sus condiciones de almacenamiento, retención y tratamiento.

GDELT publica streams principales con actualización aproximada de 15 minutos y permite reutilizar datasets con atribución; no concede derechos sobre el artículo enlazado. SEC EDGAR ofrece APIs públicas, con User-Agent identificable y límite fair-access de 10 solicitudes por segundo. Fuentes: https://www.gdeltproject.org/about.html ; https://www.gdeltproject.org/data.html ; https://www.sec.gov/search-filings/edgar-application-programming-interfaces ; https://www.marketaux.com/pricing ; https://www.marketaux.com/faq

### 13.6 Recomendación provisional

1. **Primer candidato a prueba EOD integral: EODHD Free**, porque su formato y catálogo parecen cubrir los mercados del universo y el consumo teórico (12/20) cabe en la cuota diaria. El año de histórico es insuficiente para validar estrategias de largo plazo y la cobertura exacta debe probarse.
2. **Contraste USA: Alpaca Basic**, usando barras SIP históricas de más de 15 minutos para comparar el cierre consolidado; IEX sólo como feed separado y etiquetado.
3. **Contraste de precio EOD: Alpha Vantage o FMP Basic**, con atención a ajustes corporativos, acceso por símbolo y condiciones de almacenamiento.
4. **Twelve Data Basic** es útil para una prueba USA/cripto, pero su límite de 8 créditos/min y la cobertura europea lo hacen incompleto para el universo total.
5. **Massive Basic** es alternativa USA EOD, pero el retraso hasta medianoche ET y el límite de 5 peticiones/min lo hacen menos cómodo que una consulta agrupada.
6. **Finnhub y Stooq no entran aún en la shortlist de precios EOD**: falta confirmar acceso free a candles y/o licencia automatizable.

**Conclusión:** la cuota no es el principal obstáculo. El principal riesgo es cobertura y derechos de uso, seguido por la profundidad histórica. No existe aún evidencia suficiente para afirmar que un proveedor gratuito cubra los 12 activos con cinco años de OHLCV ajustado y permisos de almacenamiento/backtesting. No iniciar desarrollo ni emitir señales hasta validar esto.

### 13.7 Restricciones y siguiente paso

- No se han ejecutado llamadas API, creado cuentas, usado claves ni consumido cuotas.
- Las cifras anteriores son estimaciones derivadas de documentación oficial, no pruebas.
- Antes de seleccionar proveedor, ejecutar una prueba pequeña y reproducible con los símbolos exactos, OHLCV, ajustes, timestamps, huecos, moneda y profundidad histórica.
- La prueba debe registrar respuestas y errores sin guardar credenciales; no activar planes de pago.
- La siguiente fase requiere autorización expresa del usuario para consumir cuotas gratuitas y/o utilizar credenciales personales.


---

## 14. Estado de pruebas técnicas autorizadas — 24-11-2026

El usuario ha autorizado pruebas limitadas con cuotas gratuitas. La autorización **no** incluye contratar planes, activar pruebas de pago, crear cuentas en su nombre ni compartir claves en el chat.

### 14.1 Acceso disponible sin credenciales
- EODHD publica un token demo que sólo funciona con una lista reducida de símbolos de ejemplo: AAPL.US, TSLA.US, VTI.US, AMZN.US, MCD.US y BTC-USD.CC. Permite comprobar el formato de respuesta para AMZN y BTC, pero no validar la cobertura de los 12 instrumentos. Documentación: https://eodhd.com/financial-apis/quick-start-with-our-financial-data-apis
- Alpaca permite consultar histórico de cripto sin autenticación; los endpoints de acciones requieren API key y secret. Documentación: https://docs.alpaca.markets/us/v1.4.2/docs/about-market-data-api ; https://alpaca.markets/sdks/python/market_data.html
- Las acciones USA de Alpaca requieren autenticación incluso en el plan Basic gratuito. El feed IEX es el feed realtime incluido; el acceso a SIP reciente está restringido y no debe confundirse con acceso consolidado gratuito. Documentación: https://docs.alpaca.markets/us/docs/market-data-faq

### 14.2 Limitación del entorno de ejecución
En esta sesión, el navegador de investigación no pudo abrir directamente los endpoints JSON y el entorno de ejecución no dispone de resolución DNS/salida de red para efectuar llamadas HTTP. Por tanto, **no se ha ejecutado ninguna petición API real en esta sesión**. No declarar una prueba como realizada basándose únicamente en documentación, ni confundir los ejemplos públicos de la documentación con respuestas de API obtenidas.

### 14.3 Próximo procedimiento de prueba
1. Preparar un pequeño harness reproducible, separado de la aplicación, para consultar EODHD y Alpaca.
2. El titular crea las cuentas gratuitas si decide utilizarlas y guarda las claves localmente o en secretos de GitHub Actions; nunca las pega en chats, commits, archivos de configuración ni logs.
3. Probar primero sólo los endpoints necesarios para resolver símbolos y obtener 1–3 barras recientes por activo, evitando descargas históricas masivas.
4. Medir llamadas/créditos realmente consumidos y capturar status HTTP, esquema, símbolo, moneda, timestamps, volumen y mensajes de error. No registrar claves ni datos sensibles.
5. No consultar endpoints de noticias, fundamentales o intradía en esta primera prueba.
6. Revisar la salida y decidir si se autoriza ampliar histórico o comparar proveedores adicionales.

**Estado:** autorización recibida; ejecución bloqueada hasta disponer de credenciales gratuitas para endpoints autenticados y de un entorno con conectividad de red. No hay resultados técnicos de API todavía.


---

## 14. Harness de validación local (24-11-2026)

**Estado inicial actualizado el 24-11-2026:** el titular ha ejecutado el harness localmente y ha aportado un informe JSON. EODHD y Alpaca ya tienen resultados empíricos iniciales; véase la sección 15. La prueba adicional Alpaca IEX sigue pendiente. No interpretar la configuración del script como prueba de cobertura.

- Script: `scripts/validate-providers.mjs` (Node.js >= 18, sin dependencias externas).
- Instrucciones Windows/PowerShell: [docs/PROVIDER_VALIDATION_WINDOWS.md](PROVIDER_VALIDATION_WINDOWS.md).
- Plantilla local: `.env.local.example`; el titular la copia como `.env.local`.
- `.env.local` y `validation-results/` están excluidos de Git mediante `.gitignore`.
- Las claves se cargan en variables de entorno del proceso; no se imprimen ni se escriben en el informe. No compartir el archivo local de credenciales.

### Límites implementados

| Fuente | Peticiones máximas por ejecución | Parámetros principales | Datos conservados |
|---|---:|---|---|
| EODHD Free | 12 individuales | EOD diario, ventana de 7 días naturales, sin reintentos | Hasta 3 barras por símbolo; 12 unidades estimadas sobre 20 diarias |
| Alpaca Basic | 1 agrupada | 6 símbolos USA: NVDA, MSFT, META, AMZN, JNJ y SPY; timeframe 1Day; feed SIP; adjustment raw; límite de respuesta 100 barras | Hasta 3 barras por símbolo |

La consulta EODHD se limita a los 12 identificadores de la tabla 13.2. Alpaca no se utiliza para los cuatro instrumentos europeos ni para cripto. Si faltan credenciales de un proveedor, ese proveedor queda omitido sin petición. El script no reintenta ni pagina resultados de Alpaca.

### Salida

El script crea localmente un JSON bajo `validation-results/` con fecha/hora, ventana, cobertura, símbolos aceptados/no encontrados, moneda, timestamps, OHLCV, adjusted close cuando EODHD lo devuelve, errores resumidos y consumo estimado. El informe no contiene credenciales.

**Importante sobre la cuota:** 12 es el máximo de peticiones EODHD iniciadas por ejecución y la estimación conservadora de consumo; confirmar el contador real de la cuenta tras la prueba. No ejecutar repetidamente el mismo día. Una petición agrupada Alpaca se contabiliza como una llamada HTTP, no seis.

### Evidencia pendiente

- [ ] El titular ejecuta el script desde Windows con sus claves gratuitas locales.
- [ ] Adjunta al chat únicamente el JSON generado, nunca `.env.local`.
- [ ] Contrastar consumo estimado con el contador real EODHD.
- [ ] Revisar símbolos aceptados, monedas, fechas, OHLCV, errores, ajustes y diferencias EODHD/Alpaca.
- [ ] Actualizar esta sección con resultados observados, separándolos de hipótesis documentales.

Hasta completar esos puntos, EODHD sigue siendo primer candidato documental y Alpaca un contraste USA; ninguno queda validado ni seleccionado.


---

## 15. Resultados de la primera ejecución local (24-11-2026)

**Evidencia:** informe aportado por el titular en `validation-results/provider-validation-2026-11-24T11-33-28-667Z.json`. Ventana consultada: 2026-11-17 a 2026-11-24. Se conservaron hasta tres barras recientes por símbolo.

| Proveedor | Resultado observado | Peticiones | Lectura |
|---|---|---:|---|
| EODHD Free | 12/12 símbolos aceptados; 0 errores | 12 | Cobertura básica confirmada para el universo probado y esos identificadores. No valida exactitud, frescura suficiente para operar, profundidad histórica ni derechos de almacenamiento/uso. |
| Alpaca Basic, feed SIP | HTTP 403: `subscription does not permit querying recent SIP data`; 0/6 símbolos | 1 | El feed SIP solicitado no está habilitado en esta modalidad. No demuestra que Alpaca Basic no funcione: su feed gratuito previsto para la prueba es IEX. |

**Cuota:** EODHD registra 12 peticiones iniciadas, equivalentes a 12 unidades estimadas frente a la referencia documental de 20/día. El titular debe contrastar el consumo con el contador real de su cuenta; la estimación del script no sustituye ese contador.

**Interpretación y límites:**
- EODHD queda como candidato técnico principal para continuar la evaluación, no como proveedor aprobado.
- Alpaca no queda descartado. Se ha añadido el modo `--alpaca-only`, que consulta exclusivamente Alpaca con `feed=iex` y evita por completo nuevas llamadas a EODHD.
- IEX representa operaciones de ese centro de negociación, no el volumen consolidado SIP. No comparar sus volúmenes como si fueran equivalentes.
- La muestra de tres barras por símbolo es demasiado pequeña para validar ajustes corporativos, huecos, series históricas o precisión frente a una fuente independiente.
- No se ha validado aún el uso de datos en automatizaciones, almacenamiento persistente ni procesamiento por LLM; siguen sujetos a los términos del plan y sus fuentes subyacentes.

**Pendiente:** ejecutar una sola vez `node .\\scripts\\validate-providers.mjs --alpaca-only` desde PowerShell y aportar el nuevo JSON. No ejecutar el modo completo para esta comprobación, porque volvería a consumir hasta 12 llamadas EODHD.

---

## 16. Resultado de la prueba Alpaca Basic con IEX (24-11-2026)

**Evidencia:** informe aportado por el titular: `validation-results/provider-validation-2026-11-24T11-54-56-212Z.json`. Modo `alpaca-only-iex`; ventana 2026-11-17 a 2026-11-24.

| Proveedor | Resultado observado | Peticiones | Lectura |
|---|---|---:|---|
| Alpaca Basic, feed IEX | 6/6 símbolos aceptados (NVDA, MSFT, META, AMZN, JNJ y SPY); 0 ausentes | 1 agrupada | Acceso técnico EOD diario confirmado para los seis símbolos USA probados mediante IEX. |
| EODHD | Omitido expresamente | 0 | El modo aislado respetó el límite y no consumió cuota EODHD. |

Parámetros: `timeframe=1Day`, `feed=iex`, `adjustment=raw`; hasta tres barras por símbolo; sin reintentos ni paginación. No se detectó página adicional.

**Interpretación y límites:**
- Alpaca Basic queda confirmado como candidato técnico complementario para barras diarias de esos seis activos USA; no como proveedor aprobado para producción.
- IEX sólo representa operaciones reportadas por ese centro de negociación. Sus volúmenes no son comparables directamente con el volumen consolidado SIP. Los precios también deben contrastarse antes de confiar en ellos.
- La muestra de tres barras no valida precisión, cobertura intradía, histórico profundo, ajustes corporativos ni continuidad.
- Esta prueba no cubre los cuatro instrumentos europeos ni BTC/ETH.
- Sigue pendiente revisar derechos de uso, almacenamiento, automatización, derivados y procesamiento por LLM bajo los términos aplicables y los derechos de mercado.
- La ejecución anterior sin claves no realizó llamadas; la prueba válida es la del informe de las 11:54:55Z.

**Estado conjunto:** EODHD devolvió 12/12 símbolos en la primera prueba; Alpaca IEX devolvió 6/6 símbolos USA en esta segunda prueba aislada. Son resultados iniciales de cobertura técnica, no una comparación de exactitud ni una decisión de arquitectura.

**Siguiente validación recomendada:** comparar EODHD y Alpaca IEX para los seis símbolos USA en fechas comunes, verificando OHLC y cierres con una tercera fuente independiente. No comparar volúmenes IEX con volúmenes consolidados. Después, evaluar histórico y ajustes corporativos. No repetir consultas EODHD ni consumir nuevas cuotas hasta definir una prueba concreta.

---

## 17. Contraste de precios USA con referencias externas (24-11-2026)

**Objetivo:** contrastar los datos EODHD y Alpaca IEX ya almacenados, sin nuevas llamadas API ni consumo de cuotas. Se compararon las sesiones comunes del 19, 20 y 23 de noviembre de 2026 para NVDA, MSFT, META, AMZN, JNJ y SPY.

### Cierres EODHD frente a Yahoo Finance

Los 18 cierres EODHD coinciden con los cierres publicados por Yahoo Finance al céntimo (seis símbolos × tres sesiones):

| Símbolo | 19 nov. | 20 nov. | 23 nov. |
|---|---:|---:|---:|
| NVDA | 145.98 | 125.53 | 165.05 |
| MSFT | 498.30 | 484.52 | 492.50 |
| META | 596.22 | 560.84 | 597.60 |
| AMZN | 257.37 | 246.82 | 255.39 |
| JNJ | 267.14 | 270.47 | 270.05 |
| SPY | 715.87 | 689.81 | 722.29 |

Referencias históricas consultadas:
- Yahoo Finance: https://finance.yahoo.com/quote/NVDA/history/
- https://finance.yahoo.com/quote/MSFT/history/
- https://finance.yahoo.com/quote/META/history/
- https://finance.yahoo.com/quote/AMZN/history/
- https://finance.yahoo.com/quote/JNJ/history/
- https://finance.yahoo.com/quote/SPY/history/
- Contraste adicional de META con su página oficial de información bursátil: https://investor.atmeta.com/stock-info/default.aspx

**Lectura:** es una señal favorable para los cierres EODHD en esta muestra. No demuestra independencia plena de la cadena de suministro de Yahoo ni exactitud general; los datos de ambas plataformas podrían compartir proveedores subyacentes. La muestra es de sólo tres sesiones y seis activos.

### Alpaca IEX frente a EODHD

Los cierres IEX difieren ligeramente de EODHD. En los 18 pares, la diferencia absoluta media es aproximadamente 0,068%; la máxima, 0,169% (MSFT, 20 nov.). Es compatible con una muestra de operaciones de un solo centro de negociación frente a una referencia de mercado más amplia, pero no permite afirmar que IEX reproduzca el cierre consolidado oficial.

No comparar volúmenes IEX con volúmenes EODHD/SIP. IEX presenta volúmenes muy inferiores porque sólo recoge operaciones de ese centro.

### Discrepancia de adjusted close de JNJ: explicada

EODHD devuelve `adjustedClose=268.71` para JNJ el 23 nov., mientras Yahoo muestra `Adj Close=270.05`. La diferencia corresponde exactamente al dividendo de **1,34 USD** cuyo ex-date es el 24 nov. de 2026, anunciado por la propia Johnson & Johnson: https://www.jnj.com/media-center/press-releases/johnson-johnson-announces-quarterly-dividend-for-fourth-quarter-2026

La metodología oficial de EODHD confirma que `adjusted_close` ajusta por splits y dividendos, mientras OHLC permanece sin ajustar: https://eodhd.com/help/methodology. En este caso aplica el factor:

`(270.05 - 1.34) / 270.05 = 0.99503796`

Ese factor produce 268.71 para el 23 nov., 269.1279 para el 20 nov. y 265.8144 para el 19 nov., coincidiendo con el informe EODHD. Por tanto, la diferencia observada se explica por convenciones/corte de ajuste distintos; no es evidencia de un error en el cierre raw. No mezclar `close` y `adjustedClose` entre proveedores sin normalizar su fecha de referencia y metodología.

### Conclusión provisional

- EODHD: candidato técnico prometedor para EOD de los seis activos USA y, por la primera prueba, del universo de 12 instrumentos. No aprobado aún.
- Alpaca Basic IEX: candidato técnico complementario; no usar sus volúmenes como volumen consolidado.
- Los cierres EODHD reciben una validación externa inicial favorable, no una certificación de calidad.
- La calidad de `adjustedClose`, especialmente JNJ, queda abierta.
- Las condiciones de licencia, almacenamiento y uso individual siguen siendo un filtro independiente de la calidad técnica.

**Siguiente paso recomendado:** resolver la semántica de ajustes y dividendos de JNJ y, en paralelo, validar la cobertura histórica EODHD de varios años con una muestra acotada. No hacer nuevas llamadas API hasta definir símbolos, fechas y consumo máximo de la prueba.

