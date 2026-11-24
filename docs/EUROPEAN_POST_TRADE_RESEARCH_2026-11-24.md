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
