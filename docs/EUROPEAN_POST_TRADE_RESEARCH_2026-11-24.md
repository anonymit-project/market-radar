# Investigación de fuentes oficiales europeas post-trade — 24-11-2026

## Alcance y método

Investigación exclusivamente documental sobre páginas, términos y documentos oficiales públicos. No se han creado cuentas, descargado ficheros de mercado, ejecutado APIs, consumido cuotas ni contactado proveedores. El objetivo es valorar si los mensajes post-trade públicos permiten construir OHLCV diarios internos para un único usuario privado.

La publicación gratuita a los 15 minutos bajo MiFIR no equivale por sí sola a una licencia de almacenamiento histórico ilimitado, ni garantiza que los datos formen un tape completo de todas las operaciones de una acción.

## Conclusiones ejecutivas

1. **Nasdaq Nordic/Baltic es el nuevo candidato más prometedor.** Publica CSV machine-readable de post-trade, retraso de 15 minutos, generación cada minuto y disponibilidad anunciada de 48 horas. Nasdaq declara el uso gratuito; las páginas específicas califican expresamente como gratuito el uso no comercial. No se ha encontrado permiso explícito de retención indefinida ni un esquema de campos/flags suficiente para dar por validado OHLCV.
2. **NGM (Nordic Growth Market) también merece un piloto documental/técnico posterior.** Publica post-trade CSV retrasado 15 minutos, accesible durante 72 horas, con uso no comercial gratuito. Cobertura declarada en Suecia, Noruega, Dinamarca y Finlandia; incluye acciones entre más de 60.000 instrumentos. Faltan esquema, completitud por instrumento y derechos de retención histórica.
3. **LSE/LSEG UK tiene archivos útiles para XLON, Turquoise y Turquoise Europe, además de TRADEcho UK APA.** Son ficheros cada minuto con retraso de 15 minutos y campos transaccionales documentados en avisos técnicos. La página de acceso permite el uso informativo, pero no resuelve con suficiente claridad el uso non-display para análisis/indicadores ni la retención. Sigue bloqueado.
4. **SIX no ofrece en la página pública revisada un tape de operaciones adecuado para OHLC.** Su descarga diaria de Historical Prices contiene precios de cierre y turnover on-order-book, con revisiones horarias por datos off-book; no basta para reconstruir Open/High/Low ni volumen completo por transacción. El feed transaccional SIX MDDX existe, pero es un producto distribuido/licenciado, no una descarga pública gratuita acreditada.
5. **BME sigue sin resolver automatización y retención.** La página ofrece JSON gratuito y legible por máquina, pero su aviso de uso personal/interno no define suficientemente el procesamiento automático persistente. No aprobar aún.
6. **Euronext conserva la mejor posición para piloto**, según la reevaluación previa: términos específicos gratuitos salvo distribución, CSV y siete mercados. Persisten dudas interpretativas de copia/retención raw y falta confirmar esquema/flags. Mantener raw mínimo y priorizar derivados internos mientras se valida.
7. **Vienna Stock Exchange / mercados asociados no son alternativa gratuita clara.** El producto post-trade público descrito es el último precio negociado netted, no el tape completo; el acuerdo publicado somete non-display a acuerdo directo y publica tarifas de post-trade en tiempo real para Vienna/Prague/Ljubljana/Zagreb.
8. **Xetra descartado provisionalmente**, **Cboe complemento técnico**, **EuroCTP no viable para non-display privado bajo el fee schedule revisado**. Se mantienen las decisiones previas.

## Matriz comparativa

| Fuente / mercados | Acceso y formato | Retención publicada | Uso privado/no comercial | ¿Permite OHLCV por trades? | Estado |
|---|---|---|---|---|---|
| Euronext: Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo, Paris | CSV post-trade, retraso máximo 15 min | Disponible al menos 24 h | Términos específicos: gratuito, sin restricciones salvo distribución; tensión con copyright general | Potencialmente sí, sujeto a esquema/flags y cobertura | **Prioridad 1; apto provisional para derivados internos** |
| Nasdaq Nordic/Baltic | CSV machine-readable, ficheros cada minuto, 15 min delayed | 48 h en Regulatory Reports | Nasdaq declara uso gratuito; páginas de instrumentos declaran uso no comercial gratuito | Potencialmente sí; falta validar campos, flags y exhaustividad | **Prioridad 2; candidato fuerte** |
| NGM | CSV post-trade, 15 min delayed | Últimas 72 h | Uso no comercial gratuito | Potencialmente sí; esquema y completitud no confirmados | **Prioridad 3; candidato** |
| LSE / Turquoise / Turquoise Europe + TRADEcho UK APA | Ficheros cada minuto, 15 min delayed; UTC | No queda clara retención histórica estable | Términos de acceso informativo; non-display/derived use no resuelto | Potencialmente sí; campos descritos en avisos técnicos | **Bloqueado por licencia/retención** |
| SIX Swiss Exchange | Descarga diaria de closing prices y turnover; actualizaciones hasta 23:45 CET | Descarga histórica diaria disponible en la página | Términos específicos de uso automatizado/retención no verificados | **No** con el fichero de cierre: no da extremos OHLC ni tape completo | **No apto como fuente OHLCV; investigar MDDX sólo si cambia el modelo de licencia** |
| BME APA | JSON gratuito, machine-readable | Página muestra ficheros por fecha; ventana/retención no precisada | Uso personal/interno; automatización no aclarada | Potencialmente sí si los JSON incluyen transacciones completas y flags | **Pendiente, bloqueado** |
| Vienna / Prague / Ljubljana / Zagreb (WBAG) | Producto post-trade descrito como último precio netted; productos de fichero y APA separados | No acreditada para acceso gratuito público | Acuerdo de mercado publicado exige acuerdo directo para non-display; tarifas visibles | No con el producto descrito de último precio | **No priorizar** |
| Cboe Europe | CSV transaccional y APA/MTF, según especificación revisada | Hasta siguiente día hábil | Automatización/retención no concluyentes; disclaimer no trading/investment decisions | Parcialmente; no consolida toda la negociación | **Complemento técnico, no fuente de señales** |
| LSEG/TRADEcho | CSV post-trade UK/EU, retraso 15 min | No se ha acreditado retención larga | Licensing/non-display/derived data pendiente | Potencialmente sí | **Bloqueado** |
| Xetra / Deutsche Börse | JSON.gz, retraso 15 min | Hasta medianoche del siguiente día hábil | Non-display/Other Application Usage no resuelto y sin tarifa aplicable clara | Técnicamente posible | **Descartado provisionalmente** |
| EuroCTP | Consolidado paneuropeo, web/API | Histórico de pago | Non-display exige licencia; coste no viable | Sí, con mayor representatividad | **Referencia visual, no ingesta automática** |

## Análisis por proveedor

### 1. Nasdaq Nordic y Baltic

La página oficial Nasdaq Regulatory Reports declara:
- post-trade delayed data para Nasdaq Nordic, Nasdaq Baltic y Nasdaq APA;
- retraso de 15 minutos;
- archivos CSV machine-readable, generados cada minuto durante horario de mercado;
- disponibilidad de los archivos durante 48 horas;
- uso gratuito. Las páginas específicas de post-trade indican expresamente que el uso no comercial es gratuito y que otros usos pueden generar fees.

La guía Nasdaq MiFID II indica que se pueden descargar CSV por instrumento con todos los trades del día de negociación. Las páginas de Nordic Equity, Baltic Equity y Nasdaq APA tienen rutas de informes separadas. Nasdaq APA es OTC reportado; no mezclarlo con los trades de los mercados lit sin deduplicación y análisis de MIC/flags.

**Fortalezas:** formato automatizable; coste cero declarado para uso no comercial; cobertura Nordic/Baltic y APA; frecuencia suficiente para reconstrucción diaria; encaje con acciones ordinarias potencialmente amplio.

**Pendientes críticos:** no se ha confirmado retención indefinida; la ventana publicada es sólo 48 h. No se ha inspeccionado un CSV ni se ha confirmado que incluya de forma uniforme ISIN, MIC de ejecución, timestamp, precio, cantidad, moneda, transaction ID, flags MMT y mensajes de corrección/cancelación. La página menciona todos los trades del día para descarga por instrumento, pero no acredita una serie histórica completa descargable desde el portal.

**Juicio:** nuevo candidato prioritario, en segundo lugar tras Euronext. La automatización privada no comercial parece compatible con el texto publicado, pero no inferir de ello permiso de archivo raw permanente. Arquitectura conservadora: ingerir a diario dentro de la ventana, calcular OHLCV y conservar preferentemente barras derivadas y metadatos, sujeto a confirmar términos completos y esquema.

Fuentes:
- https://tradereports.nasdaq.com/
- https://tradereports.nasdaq.com/shares/trade-reports/post-trade
- https://www.nasdaq.com/market-regulation/nordic/mifid-ii

### 2. Nordic Growth Market (NGM)

La página oficial ofrece datos pre-trade y post-trade MiFID/MiFIR:
- 15 minutos de retraso;
- CSV;
- datos disponibles para las últimas 72 horas;
- timestamps UTC y fechas en Europe/Stockholm;
- uso no comercial gratuito; otros usos pueden estar sujetos a tarifas.
NGM declara operar en Suecia, Noruega, Dinamarca y Finlandia y ofrecer más de 60.000 instrumentos, incluyendo acciones.

**Fortalezas:** formato simple; uso no comercial explícito; ventana de 72 h; cobertura regional interesante para complementar Nasdaq Nordic.

**Pendientes:** no se ha acreditado el número de acciones ordinarias cubiertas ni la inclusión de todas las operaciones de cada instrumento; falta esquema de datos y tratamiento de flags/correcciones. Tampoco hay autorización explícita de retención histórica indefinida.

**Juicio:** candidato de segunda línea para el piloto, especialmente para emisores listados en NGM. No asumir que sus 60.000 instrumentos son 60.000 acciones ordinarias: incluyen bonos, fondos, derivados y otros productos.

Fuente:
- https://www.ngm.se/en/the-exchange/market-data/delayed

### 3. SIX Swiss Exchange

La sección oficial Historical Prices publica ficheros diarios. La primera versión aparece a las 17:45 CET y contiene closing prices y turnover on-order-book; los ficheros se actualizan cada hora hasta las 23:45 porque pueden incorporarse datos off-order-book. Los datos de ciertos bonos ilíquidos/grandes operaciones pueden diferirse y reflejarse en ficheros corregidos.

Esto no es un tape de transacciones. Un cierre y turnover no permiten reconstruir Open, High y Low ni auditar secuencia/flags de operaciones. Por tanto, no satisface el requisito de OHLCV diario completo.

SIX MDDX sí se describe como flujo de datos pre/post-trade con timestamps UTC de microsegundos y flags MMT, pero es un producto de SIX Exfeed sujeto a acuerdos de distribución/licencia. No se ha encontrado una descarga pública gratuita equivalente a Euronext/Nasdaq.

**Juicio:** descartar el fichero Historical Prices como fuente OHLCV. No priorizar MDDX mientras el objetivo sea coste cero.

Fuentes:
- https://www.six-group.com/en/market-data/statistics/historical-prices.html
- https://www.six-group.com/dam/download/market-data/exfeed/agreements/dda-2025.pdf

### 4. London Stock Exchange / UK venues

LSEG Delayed Market Data publica ficheros de pre/post-trade con 15 minutos de retraso y generación cada minuto, para:
- London Stock Exchange (XLON);
- Turquoise (TGHL);
- Turquoise Europe (TGHE);
- post-trade de TRADEcho UK APA (ECHO).

Los avisos técnicos de LSEG describen campos como fecha/hora de negociación, identificador del instrumento, precio, divisa, cantidad, unidad de medida, MIC de ejecución, fecha/hora de publicación, MIC de publicación, transaction ID y flags. Esto es técnicamente prometedor para barras por venue y para diferenciar el venue de ejecución del de publicación.

La página pública permite usar Delayed Data para fines informativos, pero la documentación de licensing de LSEG y el contexto previo del proyecto no permiten concluir que un proceso privado non-display que calcula indicadores y señales esté cubierto sin licencia. Tampoco queda acreditada retención histórica indefinida.

**Juicio:** no usar para Market Radar hasta resolver públicamente la categoría de non-display/derived data y la retención. No contactar al proveedor.

Fuentes:
- https://dmd.lseg.com/
- https://docs.londonstockexchange.com/sites/default/files/documents/live_cds_-_001_-30012026_-_london_stock_exchange_delayed_market_data_-_tradecho_eu_post-trade_file_changes_q1_2026.pdf
- https://www.fca.org.uk/markets/market-data

### 5. BME y otros mercados Euronext

**BME:** la página oficial confirma JSON gratuito, descargable y legible por máquina. La limitación ya documentada sigue vigente: uso personal/interno no aclara automatización sistemática, persistencia, derivados ni retención. No aprobar hasta resolver esos extremos mediante términos públicos suficientemente claros. No contactar.

**Euronext:** mantener el dictamen favorable provisional ya registrado. Los siete mercados anunciados son Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo y Paris; CSV, UTC, retraso máximo de 15 minutos y disponibilidad mínima de 24 horas. Los términos específicos conceden uso gratuito sin restricciones salvo distribución. La reserva principal sigue siendo el conflicto interpretativo con el aviso de copyright general y la ausencia de permiso explícito de retención raw indefinida. No copiar más raw del necesario; priorizar OHLCV derivado y metadatos.

**Borsa Italiana:** ya forma parte de Euronext Milan; no contarla como una fuente independiente adicional.

Fuentes:
- https://www.bolsasymercados.es/en/other-services/regulatory-services/post-trade-data.html
- https://marketdata.euronext.com/data-reporting-service/trades-file

### 6. Otros mercados europeos

**Vienna Stock Exchange y mercados asociados (Prague, Ljubljana, Zagreb):** la descripción oficial del producto post-trade se refiere al último precio negociado netted y tamaño, no a un registro completo de todas las operaciones. La página de productos no acredita una descarga pública gratuita comparable a los feeds MiFIR de Nasdaq o Euronext. El acuerdo de mercado publicado indica que Non-Display Data Use requiere acuerdo directo; la lista de precios muestra importes relevantes para productos post-trade en tiempo real. No priorizar para el objetivo actual.

**Borsa Istanbul:** se ha encontrado información pública de datos de mercado retrasados y boletines, pero la distribución de market data se canaliza mediante proveedores licenciados; no se ha identificado un fichero público gratuito de operaciones MiFIR apto para automatización. Además, Turquía no forma parte del universo prioritario UE/UK de esta fase. Dejar fuera.

**Warsaw y otros venues UE:** esta búsqueda no ha identificado documentación oficial suficientemente concreta de un fichero público post-trade que reúna formato automatizable, uso privado gratuito y retención. No concluir que no exista; mantener como exploración secundaria si Nasdaq/Euronext no alcanzan cobertura suficiente.

Fuentes:
- https://www.wienerborse.at/en/market-data/market-data-sales/partner-exchanges-products/vienna/
- https://www.wienerborse.at/uploads/u/cms/files/market-data/en-market-data-agreement-102026.pdf
- https://www.borsaistanbul.com/en/data

## Implicaciones técnicas para OHLCV

Un feed público post-trade no equivale necesariamente a un consolidado de mercado. Deben generarse barras con claves y etiquetas explícitas:
- instrumento resuelto por ISIN y MIC de ejecución;
- fecha de negociación según calendario y zona horaria del mercado;
- precio y cantidad en unidades normalizadas;
- venue/APA y tipo de publicación diferenciados;
- origen de la barra: venue-only, APA-reported o consolidada (sólo si existe consolidación real).

Pipeline mínimo:
1. Ingerir el fichero diario dentro de su ventana de disponibilidad, guardando URL/fuente, timestamp de adquisición y checksum.
2. Validar esquema, encoding, número de registros y campos obligatorios.
3. Resolver instrumento contra Instrument Master (ISIN, MIC, moneda, clase de acción).
4. Aplicar cancelaciones/correcciones/amendments antes de agregar.
5. Interpretar MMT/flags; excluir o separar operaciones deferred, non-price-forming, special/negotiated y otros tipos según regla documentada.
6. Deduplicar reportes publicados por APA y por venue; no sumar el mismo trade dos veces.
7. Ordenar por timestamp de ejecución y construir Open/High/Low/Close; Volume como suma de cantidades elegibles.
8. Conciliar Close/turnover con cierre oficial y comparar cobertura con una segunda fuente cuando exista.
9. Etiquetar cada barra con MIC/ámbito, universo de flags y calidad/completitud. Nunca presentarla como volumen consolidado si sólo cubre un venue.

**Riesgo central:** incluso si el feed contiene todos los trades reportables de un venue, una acción puede negociar en múltiples venues, SI y OTC/APA. El OHLC puede ser representativo del venue cubierto, pero el volumen no es consolidado. Para señales basadas en volumen relativo o liquidez paneuropea, esta limitación es material. No usar un feed parcial como si fuese el volumen total de mercado.

## Arquitectura viable por fases

### Fase A — cobertura documental y catálogo
- Instrument Master independiente de los proveedores: ISIN, MIC primario, MIC de ejecución/publicación, ticker, moneda, clase de instrumento, país, estado/listing dates.
- ESMA FIRDS para instrumentos UE/EEE y directorios de Nasdaq Nordic/Baltic, Euronext, BME y LSE para resolver listings y MIC.
- Delimitar acciones ordinarias; ADR y clases múltiples identificadas, no mezcladas; excluir ETFs, fondos, bonos, warrants y derivados del Explorador de acciones.

### Fase B — adaptadores post-trade gratuitos
- Adaptador Euronext como primera fuente piloto documental/técnica.
- Adaptador Nasdaq Nordic/Baltic como segunda fuente; uso no comercial gratuito declarado.
- NGM como tercero opcional para ampliar cobertura nórdica.
- BME y LSEG sólo después de resolver derechos de automatización/retención.
- No integrar SIX Historical Prices como OHLCV; sólo podría servir para contrastar cierre/turnover.
- Mantener Xetra fuera del escáner; Cboe sólo para contraste técnico no decisorio.

### Fase C — barras y calidad
- Construir primero barras por MIC/venue, no consolidarlas artificialmente.
- Mantener close raw, adjusted close (si existe fuente de corporate actions separada), volumen elegible y métricas de cobertura.
- Almacenar como mínimo las barras derivadas y trazabilidad de fuente. Retener raw sólo si los términos lo permiten; en Nasdaq/NGM la ventana de publicación de 48/72 horas no debe confundirse con permiso de retención indefinida.
- No calcular indicadores de volumen consolidado hasta que la cobertura sea suficiente y comparable.

### Fase D — screening prudente
- Utilizar OHLCV venue-specific sólo para señales de precio/volatilidad que toleren ese ámbito y etiquetar limitaciones.
- Para señales de volumen/liquidez, exigir umbral de cobertura de venues y abstenerse si no se alcanza.
- No lanzar escaneo paneuropeo hasta disponer de cobertura demostrada por MIC y clases de acción.
- Complementar con proveedor EOD licenciado si la cobertura gratuita es insuficiente, sólo tras autorización de gasto y derechos.

### Fase E — validación acotada (requiere autorización posterior)
Sin ejecutar ahora. Cuando se autorice:
- elegir una acción líquida por mercado (p. ej. Nasdaq Nordic, Euronext y NGM);
- descargar manualmente un único fichero de una sesión, nunca histórico masivo;
- inspeccionar esquema/flags, reconciliar conteos y cierres, construir OHLCV de prueba;
- comprobar si el archivo diario incluye todos los trades de la sesión y cómo se gestionan cancelaciones/correcciones;
- verificar cuotas, automatización y condiciones de retención antes de un job recurrente.

## Decisiones propuestas para el registro del proyecto

- Añadir Nasdaq Nordic/Baltic como candidato fuerte gratuito para uso no comercial, pendiente de esquema y retención.
- Añadir NGM como candidato secundario gratuito no comercial, pendiente de esquema y cobertura.
- Descartar SIX Historical Prices como generador OHLCV; no descartar SIX como referencia de cierre/turnover.
- Mantener LSEG y BME bloqueados por derechos de automatización/retención insuficientemente claros.
- Mantener Euronext como primera prioridad; no afirmar retención raw indefinida.
- Arquitectura objetivo: adaptadores por venue → normalización/flags/deduplicación → barras venue-specific → quality gate → screening con abstención. Consolidación sólo si se demuestra cobertura completa.

## Fuentes oficiales adicionales consultadas

- ESMA MiFIR Article 13: https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mifir/article-13-obligation-make-pre-trade-and
- Reglamento Delegado (UE) 2025/1156, arts. 24–25: https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32025R1156
- ESMA Q&A 1554: https://www.esma.europa.eu/publications-data/questions-answers/1554
- SIX Historical Prices: https://www.six-group.com/en/market-data/statistics/historical-prices.html
- SIX Exfeed Data Distribution Agreement: https://www.six-group.com/dam/download/market-data/exfeed/agreements/dda-2025.pdf
- Nasdaq Nordic/Baltic Regulatory Reports: https://tradereports.nasdaq.com/
- Nasdaq Nordic MiFID II delayed data guide: https://www.nasdaq.com/market-regulation/nordic/mifid-ii
- NGM delayed market data: https://www.ngm.se/en/the-exchange/market-data/delayed
- LSEG Delayed Market Data: https://dmd.lseg.com/
- LSEG TRADEcho file changes (2026): https://docs.londonstockexchange.com/sites/default/files/documents/live_cds_-_001_-30012026_-_london_stock_exchange_delayed_market_data_-_tradecho_eu_post-trade_file_changes_q1_2026.pdf
- BME Post-Trade Data: https://www.bolsasymercados.es/en/other-services/regulatory-services/post-trade-data.html
- Vienna Stock Exchange market data products: https://www.wienerborse.at/en/market-data/market-data-sales/partner-exchanges-products/vienna/
- Vienna Stock Exchange Market Data Agreement (October 2026): https://www.wienerborse.at/uploads/u/cms/files/market-data/en-market-data-agreement-102026.pdf
- Borsa Istanbul data: https://www.borsaistanbul.com/en/data

## Limitaciones de esta revisión

Investigación documental, no validación de datos. No se han descargado muestras ni verificado el contenido de CSV/JSON. No se ha determinado si los archivos de Nasdaq o NGM son completos para cada MIC/acción, si contienen todos los campos requeridos o si la retención raw indefinida está permitida. Los juicios de licencia son interpretaciones de términos públicos, no dictámenes jurídicos.


---

## Actualización 25-11-2026 — Nasdaq Nordic/Baltic y NGM: esquema, flags, integridad y derechos

### Resumen ejecutivo

**Recomendación: Nasdaq Nordic Equity merece el primer piloto limitado; NGM no debe pasar todavía a piloto de ingesta.** La recomendación es condicional y no aprueba aún retención histórica indefinida. Nasdaq ofrece una ruta oficial más clara para descargar los trades de la sesión por instrumento, declara gratuito el uso no comercial y dispone de una especificación técnica pública de su producto NLS que demuestra que su infraestructura de negociación maneja ISIN, MIC, timestamps, precio, cantidad, divisa, transaction ID, MMT y cancelaciones/enmiendas. Pero NLS es un feed distinto, no el CSV gratuito: no se puede trasladar su esquema al CSV sin inspeccionarlo.

NGM ofrece CSV gratuito no comercial y ventana de 72 horas, pero su Market Data Policy introduce una ambigüedad material: las secciones 7.3 y 9.6 contemplan relación contractual y reporting para usos Derived Information, mientras que la exención de la sección 8 está redactada para receptores de datos delayed/EOD y para casos de Real-Time Data. No se ha encontrado una autorización inequívoca de automatización non-display y cálculo de OHLCV a partir de la descarga pública retrasada. Además, la retención perpetua tras terminación sólo se concede expresamente para datos recibidos y pagados (25.5), no para descargas gratuitas.

### Comparativa técnica

| Criterio | Nasdaq Nordic/Baltic | NGM |
|---|---|---|
| Acceso público | CSV machine-readable; 15 min; ficheros cada minuto; ventana 48 h en Regulatory Reports | CSV; 15 min; ventana últimas 72 h |
| Sesión por instrumento | Nasdaq declara que el CSV de cada instrumento incluye todos los trades del día actual | No se ha encontrado afirmación equivalente que garantice todos los trades por instrumento |
| Esquema CSV exacto | No publicado/confirmado en la documentación examinada; no descargar ni inspeccionar muestras en esta fase | No se ha encontrado diccionario de campos ni esquema CSV oficial |
| ISIN | Exigido por el esquema regulatorio de transparencia de acciones; NLS documenta ISIN como identificador, pero no prueba el campo en el CSV | Exigido por el esquema regulatorio aplicable, pero campo presente en el CSV no verificado |
| MIC ejecución | Campo regulatorio obligatorio; NLS documenta MIC de ejecución. CSV sin inspeccionar | Campo regulatorio obligatorio; CSV sin inspeccionar |
| Fecha/hora de ejecución | RTS 1 exige Trading date and time en UTC; NLS documenta fecha y hora de ejecución con granularidad subsegundo. CSV sin inspeccionar | RTS 1 exige Trading date and time en UTC; la página NGM indica UTC para todos los timestamps, aunque las fechas siguen Europe/Stockholm |
| Precio / cantidad / divisa | RTS 1 exige precio, moneda de precio y cantidad; NLS documenta precio, quantity, price currency y price notation. CSV sin inspeccionar | RTS 1 exige precio, moneda y cantidad; no se ha confirmado su representación exacta en CSV |
| Transaction ID | RTS 1 lo exige; NLS documenta Trade Match ID. CSV sin inspeccionar | RTS 1 lo exige; presencia y estabilidad en el CSV no verificadas |
| Flags / correcciones | RTS 1 exige flags aplicables y nuevas publicaciones de cancelación/enmienda. NLS documenta MMT 5.0 y flags CANC/AMND; también trade breaks. No se demuestra que el CSV gratuito exponga estos campos | RTS 1 exige flags y reportes de cancelación/enmienda; no se ha localizado documentación técnica NGM que confirme MMT ni su tratamiento en CSV |
| Acciones ordinarias | Nordic Equity y Baltic Equity tienen rutas específicas; la documentación Nasdaq identifica Shares como clase separada de ETF/ETP y Funds. Cobertura de todos los listings/MIC y clases no cuantificada | NGM declara operar en Suecia, Noruega, Dinamarca y Finlandia y negociar acciones, pero sus 60.000+ instrumentos incluyen bonos, AIF y derivados. No se ha acreditado el universo exacto de acciones ordinarias |
| Completitud | Afirmación Nasdaq de «all trades» por instrumento/día en la página de descarga individual; no es garantía de completitud independiente ni de todo el mercado | Sin garantía: su política indica que no garantiza datos completos o libres de errores, aunque hará esfuerzos razonables |
| OHLCV | Potencialmente reconstruible para el ámbito del venue y trades elegibles, sujeto a campos/flags del CSV | Potencialmente reconstruible, pero falta confirmar esquema y completitud |
| Retención publicada | 48 h de disponibilidad; no permiso de almacenamiento indefinido | 72 h de disponibilidad; no permiso de almacenamiento indefinido |
| Uso privado automatizado | Uso no comercial gratuito expresamente declarado; no se ha localizado cláusula pública específica sobre almacenamiento raw indefinido o non-display de este uso | Uso no comercial gratuito en la página pública; la política contractual deja dudas para Derived Information/non-display automatizado |
| Resultado | **Primer candidato a piloto acotado**, condicionado a revisión de licencia y validación del CSV | **No piloto todavía**; conservar como candidato si se resuelve el alcance de la política |

### 1. Campos regulatorios que deberían existir

El Reglamento Delegado (UE) 2017/587 (RTS 1), en su versión consolidada consultada, define para transparencia post-trade de acciones, entre otros, estos campos:
- Trading date and time.
- Instrument identification code (ISIN).
- Price, Price currency y Price notation.
- Quantity.
- Venue of execution.
- Publication date and time y Venue of publication cuando proceda.
- Transaction identification code.
- Flags aplicables.

La norma define formatos de fecha/hora ISO 8601 UTC, códigos ISO 4217 para moneda, ISIN y MIC. La norma también exige publicar un nuevo reporte con flag de cancelación cuando se cancela una operación y, cuando se enmienda, publicar el reporte de cancelación y el nuevo reporte corregido con flag de amendment.

**Límite de inferencia:** la obligación regulatoria permite anticipar el contenido semántico de un feed MiFIR, pero no sustituye al esquema publicado por cada operador ni demuestra cómo se serializan los campos en el CSV descargable. Los campos exactos, cabeceras, nulls, tipos y codificación siguen pendientes para ambos.

### 2. Nasdaq: evidencia técnica y límites

La documentación oficial Nasdaq consultada confirma:
- Regulatory Reports: archivos CSV machine-readable, 15 minutos de retraso, generados cada minuto, disponibles durante 48 horas.
- La página de Nordic Equity dice que el CSV por instrumento contiene todos los trades del día actual.
- Nasdaq publica rutas separadas para Nordic Equity y Baltic Equity; la guía MiFID separa Shares, ETF/ETP, Funds, fixed income, derivatives y APA.
- La especificación **Nordic Equity Last Sale (NLS) v1.2.10, 14-01-2026** es de otro producto, un feed directo de pago/mercado, y documenta:
  - ISIN obtenido del Order Book Directory, moneda/precio y notional currency.
  - Execution date/time, agreement date/time, precio, cantidad, MIC de ejecución, Trade Match ID y MMT Trade Flags.
  - Timestamp del mensaje en nanosegundos desde medianoche UTC.
  - MMT 5.0; flags de modificación CANC (cancelación) y AMND (enmienda).
  - Trade breaks/cancels como mensajes separados; Nasdaq indica que un break es final y no puede reinstalarse en NLS.
  - Tipos de trade que permiten distinguir operaciones estándar, subastas, dark, routed, portfolio, VWAP, contingent y non-price-forming.

Estos detalles son una prueba de que Nasdaq dispone de semántica y mecanismos de corrección en su ecosistema técnico, **no** prueba de que el CSV público retrasado contenga los mismos campos ni de que transmita los eventos de corrección con la misma granularidad. No diseñar el parser hasta una muestra autorizada posterior.

La cobertura Nasdaq es venue-specific. Los ficheros Nordic/Baltic no son un consolidado de todos los mercados donde negocia una acción. Nasdaq APA es una publicación distinta de operaciones OTC; no sumar APA y venue sin resolver duplicados, MIC de ejecución/publicación y flags.

### 3. NGM: política de datos y riesgo de licencia

La página oficial confirma CSV retrasado 15 minutos, ventana de 72 horas, timestamps UTC y fechas según Europe/Stockholm, con uso no comercial gratuito. NGM opera en Suecia, Noruega, Dinamarca y Finlandia y anuncia más de 60.000 instrumentos, incluidos equities, bonds, AIF y derivatives. Ese total no es el número de acciones ordinarias.

La **Market Data Policy v1.4**, aplicable desde 01-01-2026, requiere una lectura más estricta:
- Define Derived Information como resultados de manipulación matemática/procesamiento de datos, incluyendo IA/ML, siempre que el resultado no sea idéntico a los datos.
- La sección 7.2 permite crear, usar, mostrar y distribuir internamente/externamente Derived Information.
- La sección 7.3 dice que todo uso Non-Display y Derived Information requiere relación contractual directa con NGM y reporting previo.
- La sección 8 formula el requisito de contrato directo para casos de Real-Time Non-Display/Derived y contempla que no hace falta un Order Form separado cuando el cliente recibe sólo datos Delayed/EOD. Esto crea una ambigüedad de alcance respecto a 7.3.
- La sección 9.6 incluye cualquier uso de Derived Information entre los supuestos de notificación del Corporate Client.
- Annex A define Other Usage incluyendo análisis cuantitativo y herramientas impulsadas por IA.
- La sección 15.7–15.8 exime del pago por Display de datos delayed/EOD salvo comercialización y dice que los datos delayed pre/post-trade están disponibles gratis. No declara de forma igual de explícita que todo uso non-display/derivado automatizado sea gratuito.
- La sección 16.1 dice que NGM no garantiza que los datos sean completos o libres de errores; se compromete a esfuerzos razonables.
- La sección 25.5 permite, tras terminación, continuar mostrando perpetuamente los datos recibidos y pagados conforme a la política. No concede expresamente retención perpetua de los datos descargados gratuitamente.

Por tanto, no interpretar «non-commercial use is free» como autorización concluyente para extracción automática persistente, cálculos derivados o archivo histórico indefinido. Sin contactar al proveedor, la documentación pública no resuelve la colisión entre 7.3, 8 y 9.6 ni extiende 25.5 a los ficheros gratuitos.

### 4. Reconstrucción OHLCV y reglas de calidad

Para ambos feeds, sólo podrá construirse OHLCV venue-specific si el CSV realmente contiene al menos ISIN, fecha/hora de ejecución, precio, cantidad y flags aplicables. MIC, divisa e ID de transacción son necesarios para clasificación, normalización y deduplicación fiable.

Reglas mínimas:
1. Resolver el instrumento con ISIN y mantener MIC de ejecución y MIC de publicación separados.
2. Separar el feed del venue del APA; no sumar publicaciones duplicadas.
3. Procesar cancelaciones y enmiendas antes de agregar, manteniendo trazabilidad del original y de sus reemplazos.
4. Excluir o clasificar por separado operaciones sin precio, non-price-forming, deferred, special, auction, negotiated, portfolio y contingent según reglas documentadas.
5. Calcular Open/High/Low/Close con el timestamp de ejecución, no el de publicación; volumen como suma de cantidades elegibles, normalizando unidades y moneda.
6. Comparar número de trades y cierre contra una referencia independiente cuando sea posible.
7. Etiquetar las barras como Nasdaq Nordic venue-only, Nasdaq Baltic venue-only o NGM venue-only. No llamarlas consolidadas.
8. Marcar incompletitud si hay huecos de ficheros/minutos, errores de publicación o flags no interpretables. El volumen de un venue no equivale al volumen total de mercado.

### 5. Decisión de piloto

**Nasdaq Nordic Equity: avanzar como primer piloto documental/técnico, pero no descargar todavía.** Razones: acceso público automatizable en CSV, uso no comercial gratuito explícito, afirmación de todos los trades del día por instrumento, clases Shares separadas de ETF/fondos y especificación NLS oficial que reduce el riesgo de que no exista semántica de identificadores/flags en su infraestructura. El piloto posterior deberá verificar el CSV real y sus flags.

**Nasdaq Baltic Equity: mantener dentro de la misma evaluación, pero no mezclarlo con Nordic hasta validar el formato concreto de sus archivos.** La guía oficial menciona XLSX para descarga individual Baltic y CSV para Regulatory Reports; confirmar el endpoint exacto y consistencia de formato en el piloto.

**NGM: no pasar a ingesta todavía.** El plazo de 72 horas es atractivo, pero no compensa la falta de esquema y la ambigüedad de la política contractual para cálculos derivados. Mantenerlo como candidato condicionado, no descartado.

**Condiciones previas al piloto real:** autorización expresa del usuario para descargar un único fichero de una sesión; confirmar que la documentación vigente sigue igual; inspeccionar esquema sin automatizar ni consumir APIs/cuotas; y no conservar raw a largo plazo hasta que el derecho esté claramente respaldado. No crear cuentas, contactar, contratar ni incurrir en costes.

### Fuentes oficiales consultadas

- Nasdaq Regulatory Reports: https://tradereports.nasdaq.com/
- Nasdaq Nordic Equity Post-Trade: https://tradereports.nasdaq.com/shares/trade-reports/post-trade
- Nasdaq Baltic Equity Post-Trade: https://tradereports.nasdaq.com/baltic-trade-reports/equity/post-trade
- Nasdaq MiFID II delayed data guide: https://www.nasdaq.com/market-regulation/nordic/mifid-ii
- Nasdaq Nordic Equity Last Sale v1.2.10 (14-01-2026): https://www.nasdaq.com/docs/2026/01/14/Nordic-Equity-Last-Sale-1.2.10_0.pdf
- NGM Delayed Market Data: https://www.ngm.se/en/the-exchange/market-data/delayed
- NGM Market Data Policy v1.4 (effective 01-01-2026): https://www.ngm.se/hubfs/Market%20Data%20Policy%20ver%201.4%20-%20Final.pdf
- Commission Delegated Regulation (EU) 2017/587, consolidated text: https://eur-lex.europa.eu/eli/reg/2017/587
- Commission Delegated Regulation (EU) 2017/583, consolidated text: https://eur-lex.europa.eu/eli/reg_del/2017/583/2026-03-02/eng

### Limitaciones

No se han descargado CSV/XLSX, ni se han inspeccionado muestras, ejecutado endpoints, APIs o scripts. No se ha probado la exhaustividad real, estabilidad de IDs, cobertura por MIC, comportamiento real de correcciones ni reconstrucción OHLCV. No se ha emitido dictamen jurídico. Los campos regulatorios y la especificación NLS no deben confundirse con el esquema de los ficheros gratuitos.
