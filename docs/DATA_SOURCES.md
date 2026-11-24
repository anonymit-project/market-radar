# Data Sources — evaluación preliminar

**Estado:** investigación documental inicial; ningún proveedor está validado ni contratado. Precios y límites son los publicados en las páginas oficiales consultadas el 24-11-2026; pueden cambiar. Confirmar siempre el plan aplicable y los derechos por escrito antes de producción.

## 1. Criterios de validación
- Cobertura por país, bolsa, MIC, activo y ticker.
- Endpoint exacto, granularidad, frescura/latencia y disponibilidad histórica.
- Calendarios, splits, dividendos, ajustes y símbolos deslistados.
- Cuotas por minuto/día, pesos de endpoint, concurrencia y límites de WebSocket.
- Precio mensual real, facturación anual, impuestos y add-ons.
- Derechos de almacenamiento, caché, uso interno, visualización a tres usuarios, derivados, redistribución y uso con IA.
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

### 9.6 Conclusión y shortlist

1. **No hay proveedor de mercado validado para el dashboard compartido de tres personas bajo una licencia personal.** EODHD, FMP, Massive y Finnhub lo excluyen expresamente; Alpha Vantage no permite el acceso indirecto de otros; Alpaca requiere más validación; Twelve Data es el candidato más interesante para negociar derechos de display/derivados, pero no hay autorización confirmada.
2. **EODHD destaca para investigación privada individual** (históricos, backtesting, derivados conservables y uso personal con LLM), pero su FAQ hace inviable trasladar ese plan a los tres.
3. **Massive y FMP tienen políticas recientes y explícitas** sobre terceros, IA, derivados y retención; no deben evaluarse sólo por precio/API.
4. **GDELT sí ofrece una base reutilizable** para metadatos/eventos con atribución, pero no libera derechos de artículos subyacentes.
5. **Marketaux queda bloqueado por falta de licencia API suficientemente clara** para la distribución a tres personas.
6. La solución podría ser una licencia de display de proveedor, tres suscripciones personales independientes sin compartir datos (no resuelve señales comunes) o rediseñar el producto para que sólo una persona vea los datos y los demás reciban contenido que el proveedor autorice expresamente. No asumir que la tercera opción es válida sin autorización.
7. No se debe estimar el coste final usando precios de planes personales: pedir precio total para tres usuarios y derechos de exchange incluidos.

**Estado:** investigación documental reforzada, no asesoramiento jurídico. Las páginas oficiales reflejan términos consultados el 24-11-2026; deben releerse antes de contratar. Ninguna consulta ha sido enviada y ningún proveedor está aprobado.
