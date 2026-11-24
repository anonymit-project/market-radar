# Diseño del Explorador de acciones — investigación v1

**Fecha:** 24-11-2026  
**Estado:** propuesta técnica; no implica aprobación de proveedores, licencias ni inicio de desarrollo.  
**Alcance:** acciones cotizadas de Estados Unidos y Europa. ETF y cripto quedan fuera del universo de exploración de acciones y continúan en seguimiento separado.

## 1. Conclusión ejecutiva

No se ha identificado todavía una combinación gratuita que permita explorar de forma automatizada, sostenible y con derechos suficientemente claros miles de acciones de EE. UU. y Europa usando precios EOD completos.

La situación es asimétrica:

- **EE. UU.:** Massive Stocks Basic ofrece un candidato técnicamente interesante para catálogo y barras EOD de mercado amplio, pero con licencia personal/no comercial, limitaciones de retención y necesidad de confirmar la elegibilidad del titular. No se aprueba todavía.
- **Europa:** ESMA FIRDS y los directorios de bolsas permiten construir un universo de instrumentos amplio y trazable, pero no proporcionan por sí mismos OHLCV EOD. Euronext ofrece datos retrasados gratuitos para uso interno, aunque distingue expresamente el uso no-display automatizado y remite a sus acuerdos de licencia. BME también mantiene licencias específicas para usos display y non-display. No se ha confirmado una fuente gratuita, automatizable y paneuropea de precios EOD con derechos claros.
- **Fundamentales:** SEC EDGAR es una fuente primaria y gratuita muy valiosa para emisores que presentan ante la SEC. Para Europa, la información ESEF está distribuida entre emisores y mecanismos nacionales; ESAP no será accesible al público hasta julio de 2027 y su incorporación será gradual.
- **Noticias/eventos:** GDELT puede servir como detector de noticias y metadatos; no sustituye la confirmación en fuentes primarias. SEC EDGAR, relaciones con inversores y comunicaciones oficiales de las bolsas deben ser la evidencia de referencia.

Por tanto, el diseño debe separar catálogo, precios, fundamentales, noticias y eventos, con adaptadores independientes. No debe construirse el escáner amplio hasta resolver el bloqueo de precios/licencias europeos.

## 2. Mercados y bolsas iniciales propuestos

### Fase inicial de cobertura

**Estados Unidos**
- Nasdaq.
- NYSE.
- NYSE American.
- Incluir acciones ordinarias y ADR cotizados en esos mercados.
- Excluir OTC, ETF/fondos, preferentes, warrants, derechos, unidades y otros instrumentos no equivalentes a acciones ordinarias, salvo que se habiliten expresamente como una clase separada.

Fuentes de universo: archivos `nasdaqlisted.txt` y `otherlisted.txt` de Nasdaq Trader, complementados por el endpoint de referencia de tickers de Massive y los directorios de las bolsas. Los archivos de Nasdaq Trader se actualizan varias veces al día y contienen atributos útiles; es necesario filtrar test issues, ETF y tipos de instrumento.

**Europa**
- Xetra (Alemania).
- Euronext: Amsterdam, Paris, Brussels, Lisbon y Milan.
- BME / Bolsa española.
- London Stock Exchange (Main Market y, en una fase posterior, AIM si se decide incluir small caps).

ESMA FIRDS sirve como catálogo regulatorio transversal para la UE/EEE, no como listado limpio de acciones primarias. Debe filtrarse por CFI, tipo de instrumento, MIC, estado y fechas; después contrastar el listado con la bolsa de cotización principal. LSE requiere una fuente separada por estar el Reino Unido fuera del perímetro regulatorio de la UE.

### Ampliación posterior

SIX Swiss Exchange, Nasdaq Nordic (Stockholm, Copenhagen, Helsinki e Iceland), Warsaw y otros mercados europeos. Oslo queda cubierto por el grupo Euronext si el catálogo y los derechos de datos lo confirman.

**Criterio:** esta secuencia prioriza mercados líquidos y fuentes de referencia identificables. No debe describirse como cobertura de toda Europa hasta incorporar y validar los mercados restantes. El universo será amplio dentro de las bolsas habilitadas, sin filtro sectorial.

## 3. Fuentes por tipo de dato

### 3.1 Universo e identificadores

| Fuente | Cobertura / utilidad | Límites y riesgos | Evaluación |
|---|---|---|---|
| Nasdaq Trader Symbol Directory | Nasdaq y otros mercados USA; símbolo, nombre, mercado, estado financiero, ETF/test flags según fichero | No es un feed de precios; hay que filtrar clases y validar términos de reutilización | Candidato principal de referencia USA |
| Massive `GET /v3/reference/tickers` | Catálogo de tickers soportados, mercado, moneda, estado activo, MIC/primary exchange, FIGI/CIK cuando existan; actualización diaria | Requiere cuenta/API key; límites del plan; licencia individual no comercial y restricciones de retención | Candidato complementario USA |
| ESMA FIRDS | Instrumentos activos en RM, MTF, OTF y SI; ISIN+MIC, altas, modificaciones y bajas; ficheros completos semanales y deltas/cancelaciones diarios | XML voluminoso; incluye bonos, derivados y múltiples venues; no identifica siempre una única cotización primaria | Candidato central de referencia UE/EEE |
| Directorios de bolsas | Validación de admisión/listado principal y tipo de valor: Xetra, LSE, BME y Euronext | Formatos, frecuencia y términos heterogéneos; Euronext ofrece productos estructurados de referencia de pago | Complemento necesario |
| OpenFIGI | Resolución y mapeo de identificadores; FIGI abierto | API gratuita con límites; no proporciona precios ni fundamentales | Candidato para entity resolution |
| GLEIF | LEI y datos de entidades legales; datos CC0 y API pública | El LEI no identifica por sí solo cada clase/listado | Complemento para identidad del emisor |

### 3.2 Precios EOD / OHLCV

| Fuente | Cobertura / límites publicados | Licencia y calidad | Evaluación |
|---|---|---|---|
| Massive Stocks Basic | USA; 5 llamadas/min; 2 años EOD; catálogo actualizado diariamente; endpoint de barras agrupadas de todo el mercado en una petición. El día anterior se habilita después de medianoche ET | Términos para uso personal, no comercial; no compartir; eliminar datos y cachés dentro de 30 días al terminar licencia. Debe comprobarse elegibilidad non-professional y derechos subyacentes | Mejor candidato técnico para USA, no aprobado |
| EODHD Free | Cobertura multi-mercado candidata; 20 llamadas/día; 1 año EOD; sin Screener ni Fundamentals | Ya probado de forma limitada. 12 símbolos aceptados; 18/18 cierres de seis acciones USA coincidieron con Yahoo en tres fechas; histórico de cuatro símbolos y 1.125 barras superó controles estructurales básicos. No valida miles de símbolos, todos los ajustes ni licencia de producción | Insuficiente para exploración amplia; mantener como candidato de contraste |
| Euronext delayed data | Datos de negociación retrasados hasta 15 minutos, publicación gratuita por MiFIR; CSV disponibles | Uso interno retrasado gratuito, pero Euronext diferencia Display y Non-Display; las aplicaciones/cálculos automatizados pueden requerir acuerdo/licencia. Condiciones del fichero restringen copia y redistribución | No asumir que permite un escáner automatizado persistente; aclaración/licencia pendiente |
| BME Market Data | Directorios, datos y comunicaciones de mercado | Desde 23-08-2026 dispone de contratos separados Display y Non-display y tarifas; no se ha acreditado un feed EOD gratuito para automatización | No usar como fuente automatizada sin derechos expresos |
| FMP Basic | 250 llamadas/día; EOD histórico y datos de perfil/referencia | La oferta Basic no incluye expresamente fundamentals/ratios anuales, news ni cobertura global; estos aparecen en planes superiores | No resuelve el escaneo fundamental gratuito |
| Twelve Data Basic / Alpha Vantage Free / Stooq | Alternativas para consultas puntuales o contraste | Límites por crédito/llamada, cobertura europea y derechos de almacenamiento/automatización no resueltos suficientemente para miles de acciones | No shortlist de producción |

**Bloqueo crítico:** no se ha encontrado una fuente gratuita paneuropea que reúna simultáneamente cobertura amplia de acciones, OHLCV EOD automatizable, límites sostenibles, almacenamiento histórico permitido y licencia clara para análisis algorítmico privado. No sustituir este vacío por scraping de Yahoo Finance, páginas de brokers o webs financieras, ni por endpoints no oficiales.

### 3.3 Fundamentales

**Estados Unidos — SEC EDGAR**
- APIs públicas de submissions y XBRL en `data.sec.gov`, sin autenticación ni API key.
- Company Facts reúne los hechos XBRL de un emisor en una llamada; también hay archivos ZIP bulk nocturnos.
- Actualización durante el día tras la difusión de filings; la SEC indica retrasos típicos inferiores a un minuto para XBRL, sujetos a picos.
- Acceso justo: User-Agent identificable y máximo de 10 solicitudes/segundo para SEC.gov; descargar sólo lo necesario.
- Limitación: no todos los conceptos están normalizados; las APIs agregan taxonomías estándar y hechos de entidad, mientras que extensiones, dimensiones, periodos y unidades requieren tratamiento. No todos los emisores extranjeros presentan datos comparables en Company Facts.

**Europa**
- Los emisores sujetos a la normativa de transparencia publican informes anuales ESEF en XHTML; estados financieros IFRS etiquetados con iXBRL.
- Hoy la información sigue dispersa entre webs de emisores y OAM/registros nacionales. No se ha confirmado una API pública única y completa para extracción masiva comparable.
- ESAP: recopilación desde julio de 2026; portal público previsto para julio de 2027, con despliegue gradual. No diseñar la v1 como si ya estuviera disponible.

**Recomendación:** fundamentales no son un requisito para el primer filtro de miles de acciones. Aplicar una criba cuantitativa basada en precios/liquidez y enriquecer después un grupo reducido de candidatos con SEC XBRL (USA) y documentos ESEF/filings primarios (Europa). Si no se puede normalizar con fiabilidad, marcar dato ausente y abstenerse; no imputar ratios.

### 3.4 Noticias y eventos

| Fuente | Función | Límites / derechos | Evaluación |
|---|---|---|---|
| GDELT DOC 2.0 / Events / GKG | Descubrimiento global de noticias, menciones, entidades, temas y eventos; multilingüe | Datos GDELT reutilizables sin tarifa, con cita y enlace al proyecto. Los artículos enlazados conservan derechos de sus editores. DOC está rate-limited; no hay cuota fija pública fiable | Detector y deduplicador, no fuente de verdad |
| SEC EDGAR | Filings 8-K, 10-K, 10-Q, 6-K, 20-F y otras comunicaciones | API sin API key; acceso justo y User-Agent declarado | Fuente primaria USA |
| Relaciones con inversores | Resultados, guidance, comunicados, presentaciones, cambios de dirección, operaciones corporativas | Cada emisor define sus canales y formatos; conservar enlaces y metadatos, no copiar contenido protegido indiscriminadamente | Fuente primaria |
| Bolsas y reguladores | Información privilegiada, suspensiones, admisiones, exclusiones, dividendos, splits y otros eventos | Cobertura y formatos por jurisdicción; derechos de datos distintos de la mera publicación regulatoria | Fuente primaria |
| Marketaux y agregadores comerciales | Alternativa de noticias | Derechos de almacenamiento, snippets, redistribución y uso LLM no resueltos para el caso | No aprobar |

No almacenar artículos completos ni enviar texto protegido a un LLM sin permiso. Guardar URL, título/metadatos permitidos, editor, timestamps, entidad asociada y evidencia primaria.

## 4. Modelo de universo e identidad

No usar el ticker como clave primaria.

- `issuer_id`: identidad de la empresa; LEI y/o CIK cuando existan.
- `security_id`: clase de acción, preferentemente ISIN; FIGI como identificador auxiliar.
- `listing_id`: combinación de security + MIC + moneda/mercado.
- `ticker_mapping`: ticker por proveedor, MIC, moneda, vigencia desde/hasta y fuente.
- `instrument_type`: common stock, ordinary share, ADR, preferred, ETF, fund, warrant, right, unit, etc.
- `listing_status`: active, suspended, delisted, cancelled, unknown.
- `primary_listing`: indicador con evidencia; no inferirlo sólo por volumen.
- Mantener histórico de cambios de ticker, ISIN, MIC, fusiones, splits, exclusiones y cambios de clase.

Deduplicar por clase/ISIN, no sólo por nombre de empresa. Una empresa puede tener varias clases legítimas y varios listados; conservarlos y elegir una cotización primaria para el escaneo.

## 5. Pipeline de filtrado

### Etapa 0 — Elegibilidad e integridad
Filtrar instrumentos que sean acciones ordinarias/ADR habilitadas; excluir ETF, fondos, warrants, derechos, unidades, preferentes, deuda, derivados, OTC y test issues. Verificar estado activo, MIC, moneda, ISIN/identificador y calidad de mapeo. Poner casos dudosos en cuarentena.

### Etapa 1 — Negociabilidad
Aplicar umbrales configurables, no universales:
- capitalización mínima;
- mediana de valor negociado diario (turnover) a 20/60 sesiones;
- precio mínimo;
- sesiones válidas suficientes;
- porcentaje máximo de días sin negociación;
- spread/volatilidad anómala si el proveedor ofrece evidencia suficiente.

No fijar todavía los umbrales finales. Empezar con bandas de liquidez por mercado y permitir una vía separada para small caps, para no eliminar oportunidades sólo por tamaño.

### Etapa 2 — Detección cuantitativa
Calcular features deterministas:
- retorno 1/5/20/60/120 sesiones;
- fuerza relativa frente a benchmark y sector;
- distancia a máximos/mínimos 20/52 semanas;
- ruptura de rango y confirmación por volumen relativo;
- gap, rango verdadero/ATR, volatilidad realizada;
- drawdown, reversión y anomalías de volumen/turnover;
- tendencia y estructura de máximos/mínimos;
- rendimiento relativo por moneda/mercado con FX identificado.

No convertir un movimiento aislado en señal. Exigir datos válidos, confirmación y contexto de mercado.

### Etapa 3 — Eventos y catalizadores
Cruzar candidatos con filings, noticias y eventos próximos: resultados, guidance, M&A, regulación, litigios, contratos, dividendos, splits, ampliaciones, recompras, cambios de dirección y riesgos operativos. Deduplicar por evento y entidad; verificar en fuente primaria.

### Etapa 4 — Ranking y shortlist
Crear puntuación explicable por dimensiones (tendencia, momentum, ruptura, volumen, reversión, liquidez, catalizador, calidad de datos y riesgo). Mantener puntuaciones parciales y motivos de exclusión. No permitir que el LLM cambie puntuaciones ni reglas.

El tamaño de shortlist será dinámico y dependerá de la calidad: no imponer una cuota diaria ni forzar alertas. Objetivo inicial orientativo: decenas de candidatos para revisión detallada, no miles de análisis LLM.

### Etapa 5 — Analizador profundo
Sólo para candidatos:
- fundamentales y calidad financiera;
- valoración por métodos adecuados al sector;
- balance, caja, deuda, dilución y asignación de capital;
- histórico y comparables;
- riesgos, catalizadores y escenarios;
- revisión de tesis y margen de seguridad;
- decisión explícita: oportunidad, seguimiento, evitar o abstención.

## 6. Arquitectura lógica propuesta

```text
Exchange / regulator directories
              |
              v
      Universe Discovery
              |
              v
 Canonical Instrument Master <---- Identifier Resolver (ISIN/LEI/CIK/FIGI)
              |
              v
     Eligibility & Deduplication
              |
              v
     Provider Capability Router
       /         |          \
      v          v           v
  EOD Prices  Fundamentals  News/Events
      |          |           |
      v          v           v
       Raw / permitted evidence layer
                    |
                    v
        Normalization & Data Quality
                    |
                    v
          Feature / Screening Engine
                    |
                    v
             Candidate Ranking
                    |
                    v
          Deep Analyst (candidate only)
                    |
                    v
       Deterministic decision / abstention
```

Cada adaptador declara: mercados/MIC, instrumentos, endpoints, granularidad, retraso, histórico, límites, coste, licencia, derechos de almacenamiento, retención, uso no-display, LLM y fecha de revisión. El router selecciona fuente por capacidad y política; nunca mezcla silenciosamente feeds o convenciones de ajuste.

Separar:
1. catálogo de instrumentos;
2. precios OHLCV;
3. fundamentales/filings;
4. noticias;
5. eventos corporativos;
6. calendarios de mercado y FX.

Normalizar timestamps UTC + zona de mercado, moneda, sesiones, raw close y adjusted close. Registrar proveedor, endpoint, retrieved_at, published_at, source_id, metodología de ajuste y licencia. Los datos con derechos inciertos no entran en almacenamiento persistente.

## 7. Calidad, trazabilidad y abstención

- Validar sesiones contra calendario oficial de cada MIC.
- Detectar huecos, duplicados, barras OHLC inválidas, volumen cero, moneda equivocada y saltos no explicados.
- Contrastar outliers y corporate actions con fuentes primarias.
- Conservar la versión de los datos disponible en la fecha de señal; evitar look-ahead y survivorship bias.
- No combinar precios raw/adjusted de proveedores distintos sin normalización explícita.
- Si faltan datos o licencia, no generar señal para el instrumento; registrar motivo.
- No confundir un catálogo amplio con cobertura de precios: cada instrumento debe tener estado de disponibilidad por fuente y fecha.

## 8. Decisiones pendientes / bloqueos

1. Resolver una fuente de precios EOD automatizable y con licencia clara para Europa.
2. Confirmar elegibilidad personal/non-professional y condiciones de Massive antes de cualquier prueba o uso.
3. Confirmar derechos de almacenamiento y retención de cada fuente de precios; no depender de Massive como archivo permanente.
4. Definir umbrales de liquidez por mercado y tratamiento de ADR/small caps.
5. Validar el universo de bolsas iniciales y su extensión por fases.
6. Confirmar método de descarga/ingesta de ESMA FIRDS y coste operacional de procesar los ficheros XML.
7. Definir conjunto mínimo de métricas fundamentales homogéneas USA/EU.
8. Evaluar ESEF/OAM por país hasta que ESAP esté disponible.

## 9. Siguiente paso recomendado

Continuar investigación documental centrada en el bloqueo europeo de precios EOD y sus licencias. No consumir cuotas, no usar credenciales, no ejecutar pruebas API ni iniciar desarrollo hasta que el usuario autorice una prueba concreta y exista una fuente candidata con derechos claros.

## 10. Fuentes oficiales consultadas

- SEC EDGAR APIs: https://www.sec.gov/search-filings/edgar-application-programming-interfaces
- SEC Fair Access / privacidad: https://www.sec.gov/about/privacy-information
- Nasdaq Trader Symbol Directory: https://www.nasdaqtrader.com/Trader.aspx?id=SymbolDirDefs
- NYSE Listings Directory: https://www.nyse.com/listings_directory/stock
- ESMA FIRDS dataset: https://data.europa.eu/data/datasets/financial-instruments-reference-data-system?locale=en
- ESMA FIRDS download instructions: https://www.esma.europa.eu/sites/default/files/library/esma65-8-5014_firds_-_instructions_for_download_of_full_and_delta_reference_files.pdf
- Deutsche Börse Xetra instruments: https://www.cashmarket.deutsche-boerse.com/cash-en/trading/Tradable-Instruments-Xetra/xetra
- BME listed companies: https://www.bolsasymercados.es/es/bme-exchange/mercados-y-cotizaciones/acciones/empresas-cotizadas.html
- LSE instruments: https://www.londonstockexchange.com/en/reports/issuers-and-instruments
- Euronext market-data policies: https://www.euronext.com/en/data/real-time-data/pricing-specs-agreements/market-data-pricing-policies
- BME data-feed licensing: https://www.bolsasymercados.es/es/bme-exchange/mercados-y-cotizaciones/market-data-services/documentacion/flujos-de-datos.html
- Massive Stocks API: https://massive.com/docs/rest/stocks/overview
- Massive All Tickers: https://massive.com/docs/rest/stocks/tickers/all-tickers
- Massive market-data terms: https://massive.com/legal/market-data-terms-of-service
- FMP pricing: https://site.financialmodelingprep.com/pricing-plans
- OpenFIGI API: https://www.openfigi.com/api/documentation
- GLEIF Open Data: https://www.gleif.org/en/about/open-data/
- GDELT terms: https://www.gdeltproject.org/about.html
- European Commission ESEF requirements: https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/transparency-requirements-listed-companies_en
- ESMA ESAP: https://www.esma.europa.eu/esmas-activities/data/european-single-access-point-esap
- ESMA ESAP first-phase collection: https://www.esma.europa.eu/press-news/esma-news/esma-launches-data-collection-under-first-phase-esap


---

## 11. Actualización crítica — ficheros MiFIR y EuroCTP (24-11-2026)

Esta actualización corrige y amplía la evaluación inicial de fuentes europeas. Se han revisado los textos oficiales y especificaciones; no se han descargado ficheros de mercado ni ejecutado pruebas.

### 11.1 Ficheros públicos de transparencia post-negociación

El Reglamento Delegado (UE) 2025/1156 establece que los datos post-trade retrasados deben ofrecerse en formato legible por máquina y humano, en ficheros diarios por instrumento o categoría, con actualización durante la sesión y disponibilidad al menos hasta el siguiente día hábil. MiFIR exige acceso público gratuito a los datos retrasados 15 minutos después de publicación. Esto hace viable una ingesta automatizada en principio, pero no convierte automáticamente cada feed de venue en un registro consolidado de todo el mercado.

Fuentes verificadas:

| Fuente | Datos y alcance | Acceso / licencia | Uso potencial |
|---|---|---|---|
| Euronext Trades Files | CSV de ejecuciones retrasadas, UTC; Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo y Paris; ventanas de día actual/anterior y al menos 24 h | Descarga pública gratuita. Sus términos indican uso gratuito sin restricciones salvo distribución; si se distribuye, aplican atribución y disclaimer y puede requerirse acuerdo | Candidato fuerte para construir barras propias por venue, sujeto a validar campos, cobertura y correcciones |
| Deutsche Börse / Xetra | Ficheros JSON comprimidos de post-trade Xetra y otros venues; 15 min retraso; actualización cada minuto; hasta medianoche del siguiente día hábil | Acceso gratuito, pero el uso está sujeto a términos y política de datos. La política separa usos display/non-display y feeds/APIs; confirmar por escrito que el flujo automatizado privado propuesto está permitido antes de persistirlo | Candidato técnico Xetra, licencia pendiente |
| Cboe Europe | CSV retrasados; operaciones ejecutadas en BXE/CXE/DXE, libros lit/dark/auction, operaciones reportadas y algunas APA/MTF reportadas a sus APA; ficheros minutely y diario | Sin registro ni identificación; 15 min retraso. Revisar disclaimer/terms antes de uso persistente | Fuente complementaria de actividad en venues Cboe, no sustituto del mercado primario |
| BME APA post-trade | Ficheros JSON públicos, legibles mecánicamente | La página limita descargas/copias/impresiones a uso personal e interno; uso comercial o redistribución de pago requiere autorización. No se ha confirmado autorización para extracción automatizada sistemática | Candidato para revisión de datos; no aprobado para job automático |
| LSEG delayed transparency | Ficheros de operaciones y cotizaciones retrasadas de XLON/Turquoise/APA | Página LSEG declara licencia para non-display, derived data y otras aplicaciones; no asumir uso automatizado gratuito | No aprobado para automatización sin licencia |

**Límite de cobertura:** los ficheros de cada operador reflejan los sistemas y operaciones que ese operador/APA publica. No son por sí solos un consolidado completo de todos los centros de negociación donde se negocia una acción. Los volúmenes derivados deben etiquetarse como venue-specific, salvo que se obtenga una fuente consolidada.

**Cómo construir barras:** agrupar operaciones por ISIN + MIC de ejecución + fecha de negociación; ordenar por timestamp de ejecución; Open = primera operación válida, High/Low = extremos, Close = última operación válida y Volume = suma de cantidades elegibles. Antes de calcular:
- interpretar flags de operación, subastas, negociación fuera de libro y deferrals;
- procesar cancelaciones y correcciones/amendments sin duplicar volumen;
- excluir registros no representativos (p.ej. operaciones especiales) conforme a las reglas del feed;
- normalizar moneda, nominal/cantidad y unidades;
- documentar que OHLCV es del venue/APA cubierto, no necesariamente volumen consolidado;
- conciliar el cierre con fuente primaria y con un proveedor independiente cuando sea posible.

El volumen de APA puede representar operaciones OTC reportadas y no debe sumarse ciegamente a los volúmenes del libro de órdenes: hay que deduplicar y entender venue of execution, publication venue y flags.

### 11.2 EuroCTP — consolidado paneuropeo operativo

EuroCTP fue autorizado por ESMA el 27-07-2026 y lanzó el primer consolidado europeo de acciones y ETF el 14-09-2026. Consolida datos pre-trade y post-trade de múltiples venues/APAs. Es una fuente estratégica que no figuraba en la primera versión del diseño.

Sin embargo, su acceso gratuito no resuelve la automatización privada:
- Los inversores minoristas no profesionales pueden acceder gratuitamente a través del sitio web y deben declarar su estatus.
- La política de EuroCTP define Non-Display Use como acceso/procesamiento para fines distintos de mostrar los datos en formato legible por humanos.
- Para Non-Display Use se exige firmar una EuroCTP Data Licence antes de usar los datos, tanto intradía como después de medianoche UTC.
- El fee schedule publicado (versión 08-04-2026, sujeto a revisión ESMA) indica 4.000 €/mes por Client Group para la Data Licence non-display; el acceso Web API tiene además 56 €/mes de conectividad. No se debe interpretar el precio Web API como coste total.
- El histórico de días anteriores al último día hábil figura a 204 €/día; exento para titulares de Data Licence durante su periodo.
- La creación de Derived Data está permitida estrictamente para uso interno, pero no debe suponerse que un feed automatizado personal queda exento de la Data Licence.

Conclusión: EuroCTP es excelente para consulta visual/manual gratuita y referencia consolidada, pero no es una solución económicamente viable para el escáner automático privado bajo la política publicada. Revalidar términos y precios antes de cualquier uso.

### 11.3 Revisión de otros proveedores

- **Stooq:** catálogo y series diarias históricas atractivos, pero no ofrece API oficial documentada; el acceso automatizado ha sido bloqueado/captcha en 2026 según evidencia secundaria. Términos de uso personal y prohibición de redistribución. No basar una ingesta programada en endpoints no oficiales.
- **Alpha Vantage:** la API documenta series diarias globales, pero el plan gratuito limita a 25 solicitudes/día; TIME_SERIES_DAILY_ADJUSTED es premium y el modo diario gratuito sólo entrega una ventana compacta de 100 barras por defecto. Útil para contraste puntual, no para escaneo de miles.
- **Twelve Data:** el catálogo EOD cubre más de 100 bolsas, pero el plan Basic gratuito está descrito como real-time US equities/ETF y FX/crypto, con tres mercados; EOD global aparece desde Grow (pago). Además, varios mercados europeos relevantes —incluidos Italia y Nordics— están marcados como no soportados/licencia requerida en su página EOD. No resuelve gratuitamente el universo propuesto.
- **OHLC.io:** API moderna con precios EOD, IDs estables, ajustes y consulta de mercado completo por fecha. El plan gratuito sólo habilita seis símbolos USA; UK/France/Netherlands y otros mercados europeos aparecen desde Pro. Es candidato comercial a evaluar si se acepta coste, no solución gratuita europea.
- **Yahoo Finance:** sus términos prohíben expresamente la extracción automatizada sin permiso previo. No usar scraping ni librerías no oficiales como fuente de producción.

### 11.4 Conclusión actualizada

La hipótesis inicial de que no existía ninguna vía automatizable europea gratuita era demasiado tajante. Sí existen feeds públicos de transparencia post-trade que pueden permitir construir barras EOD de determinados venues. La limitación es que:
1. son datos de cada venue/APA, no necesariamente volumen consolidado;
2. la cobertura, flags y calidad varían;
3. los derechos de automatización/retención difieren por operador;
4. no todos los mercados de la lista inicial quedan cubiertos por un feed con derechos suficientemente claros.

La nueva arquitectura recomendada es híbrida:
- catálogo de instrumentos vía ESMA FIRDS y directorios de bolsa;
- precios USA desde proveedor con licencia personal adecuada o feed público de exchange, pendiente de selección;
- precios europeos mediante feeds post-trade de venue sólo donde el uso automatizado privado esté permitido y tras validar cobertura/flags;
- EuroCTP como referencia visual y benchmark de mercado, no como fuente automatizada hasta que exista licencia asequible;
- adaptador comercial de respaldo si la cobertura gratuita no alcanza un mínimo aceptable.

### 11.5 Siguiente validación documental/técnica

1. Confirmar el alcance de los términos de Deutsche Börse para automatización privada no-display y retención.
2. Analizar el esquema completo de los CSV de Euronext y sus flags de corrección/cancelación.
3. Revisar los términos completos de Cboe y determinar si el daily file es venue-specific o incluye operaciones APA reportadas.
4. Determinar si los feeds de transparencia de venues primarios permiten OHLCV diario suficientemente completo para screening, distinguiendo volumen de venue de volumen consolidado.
5. No descargar ficheros, ejecutar scripts ni crear cuentas hasta autorización expresa para una prueba acotada.


### 11.6 Revisión detallada de derechos y formatos — 24-11-2026

**Euronext Trades Files**
- La página oficial confirma CSV post-trade, retraso máximo de 15 minutos, timestamps UTC y disponibilidad mínima de 24 horas para Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo y Paris.
- Sus términos específicos conceden uso gratuito y dicen no imponer restricciones salvo distribución. No obstante, la cabecera de copyright de la misma página dice que los datos no pueden copiarse ni redistribuirse salvo autorización. La coexistencia de ambas cláusulas deja sin resolver el alcance de la copia técnica, almacenamiento histórico y creación de OHLCV internas.
- La página pública no expone un diccionario de campos ni un fichero de muestra accesible en la documentación consultada. Por tanto, no se ha confirmado que cada fila incluya ISIN, MIC de ejecución, timestamp de operación/publicación, precio, cantidad e indicadores de corrección/cancelación.
- **Estado: candidato prioritario, pero licencia y esquema pendientes.** Solicitar confirmación escrita a Euronext antes de automatizar o persistir datos. No asumir que la disponibilidad durante 24h autoriza conservarlos indefinidamente.

**Deutsche Börse / Xetra**
- La página oficial confirma ficheros descargables JSON.gz, datos post-trade retrasados 15 minutos, actualización cada minuto, timestamps UTC y disponibilidad hasta medianoche del siguiente día hábil.
- La política DBAG (24-09-2025, v2.8) dice que el uso gratuito se condiciona a no comercializar los datos. Sin embargo, define el uso non-display como procesamiento para fines distintos de mostrar datos; incluye análisis cuantitativo/gestión de cartera como «Other Application Usage» y establece que puede requerir licencia. También indica que una aplicación sólo de almacenamiento puede estar sujeta a otras licencias.
- La FAQ indica que el NDDU de datos retrasados no genera tarifa en la categoría general salvo excepciones de la lista de precios, pero eso no elimina la obligación de declarar/encuadrar el uso ni resuelve el almacenamiento persistente. La política recomienda consultar a DBAG cuando el caso no esté enumerado.
- **Estado: no aprobado todavía.** La gratuidad de acceso no basta para concluir que un escáner personal automatizado que calcula señales y conserva histórico esté autorizado. Pedir confirmación escrita a data.services@deutsche-boerse.com; no registrarse ni iniciar feeds.

**Cboe Europe — feed nuevo, no el legacy**
- Desde 2026 existe una nueva especificación «Delayed Transparency Files» v1.0.7 (31-07-2026), que sustituye progresivamente el servicio MiFID Public Trade Data legacy; la migración paralela anunciada termina el 27-11-2026.
- La nueva especificación confirma CSV machine-readable, ficheros por minuto, fichero diario cuando aplique y disponibilidad hasta el siguiente día hábil, sin registro/CAPTCHA/throttling según el documento.
- El post-trade incluye ISIN, hora de ejecución, precio, divisa, cantidad, MIC de ejecución y publicación, ID de transacción y flags. Distingue operaciones de BXE/CXE/DXE (lit, dark, subastas, reportes off-book y MTF) y reportes APA off-exchange/SI; los APA pueden incluir trades de otros MTF reportados a Cboe. No representa toda la negociación europea del instrumento.
- Los flags identifican cancelaciones (CANC), modificaciones (AMND), operaciones no formadoras de precio (NPFT/TNCP), operaciones negociadas, benchmarks y diferimientos (LRGS/ILQD/SIZE/DEFF). Deben procesarse antes de calcular OHLCV; no sumar duplicados entre publicación APA y venue.
- La página actual contiene un disclaimer «Not for Trading or Investment Decisions» y deja cualquier dependencia de los datos bajo riesgo del usuario. No es una prohibición técnica de acceso, pero sí un riesgo material para el propósito de Market Radar y exige valoración jurídica/operativa previa.
- **Estado: candidato técnico sólido como complemento, no como fuente única ni aprobada.** La especificación describe claramente el contenido, pero la página consultada no resuelve de forma suficiente la retención histórica más allá de la disponibilidad indicada ni el alcance exacto de uso automatizado privado.

**BME APA y LSEG**
- BME declara que la información sólo puede descargarse/copiarse/imprimirse para uso personal y que está destinada exclusivamente al uso interno. No se ha confirmado si la automatización sistemática y el almacenamiento histórico derivado entran en ese uso personal. Mantener bloqueado hasta aclaración.
- LSEG ofrece ficheros delayed públicos, pero su página de licensing declara que se requiere licencia para non-display, derived data y otras aplicaciones. No usar para el escáner sin licencia expresa.

**Decisión provisional**
- Euronext y Xetra siguen siendo las dos fuentes prioritarias para intentar un piloto europeo, pero ninguna queda legalmente aprobada para ingesta automatizada persistente.
- Cboe mejora la cobertura de negociación alternativa y APA, pero es un complemento de alcance parcial y su disclaimer limita su idoneidad para apoyar decisiones de inversión.
- Las barras construidas desde un feed de venue deben etiquetarse con MIC/ámbito y no presentarse como volumen consolidado. Un OHLC de operaciones reportadas puede servir para precios del venue; el volumen sólo será comparable si el universo de operaciones incluidas y los flags están definidos y completos.
- Próximo paso: solicitar por escrito a Euronext y Deutsche Börse confirmación de automatización privada, uso non-display/quantitative analysis, creación de datos derivados internos, conservación histórica indefinida y límites de redistribución. No enviar consultas ni descargar ficheros sin autorización expresa del usuario.

Fuentes oficiales revisadas:
- Euronext Trades Files y términos: https://marketdata.euronext.com/data-reporting-service/trades-file
- Deutsche Börse delayed data: https://www.mds.deutsche-boerse.com/mds-en/real-time-data/Delayed-data
- Deutsche Börse Market Data Policy Guidelines v2.8: https://www.mds.deutsche-boerse.com/resource/blob/4028410/8c40e8b49bbbae4adcf9aee2f8193ad6/data/Market%20Data%20Policy%20Guidelines%20and%20FAQ_V2_8.pdf
- Cboe Delayed Transparency Files specification v1.0.7: https://cdn.cboe.com/resources/participant_resources/Cboe_Titanium_Europe_Aggregated_Depth_Feed_Specification.pdf
- Cboe delayed transparency page and disclaimer: https://www.cboe.com/markets/eu/equities/transparency-data/
- BME APA post-trade: https://www.bolsasymercados.es/es/otros-servicios/servicios-regulatorios/post-trade-data.html
- LSEG delayed data: https://dmd.lseg.com/


### 11.7 Aclaración: uso privado, scraping y licencias — 24-11-2026

El carácter privado/no comercial de Market Radar reduce el riesgo de redistribución y comercialización, pero no convierte automáticamente cualquier extracción automatizada en libre. Deben separarse el acceso técnico, los términos contractuales aceptados al acceder, los derechos sui generis sobre bases de datos y la licencia de uso de datos de mercado. La normativa española de bases de datos protege frente a extracción/reutilización de partes sustanciales y frente a extracción repetida/sistemática de partes no sustanciales que perjudique la explotación normal; la excepción de extracción privada del art. 135 se refiere a bases de datos no electrónicas, no es una excepción general para scraping de bases online.

**Euronext — reevaluación favorable, con reserva de copia/retención**
- Los términos específicos de Delayed Trade Data (cláusula 1) dicen expresamente que el derecho de uso es gratuito y no impone restricciones salvo distribución. Esto respalda razonablemente el uso interno privado, el procesamiento y los indicadores derivados que no se distribuyan.
- La página incorpora además un aviso de copyright que dice que los datos no pueden copiarse ni redistribuirse salvo autorización. Hay tensión entre el aviso general y la cláusula específica que define «Use» incluyendo acceso, descarga y uso, y que sólo limita la distribución. La lectura más razonable para un usuario privado es que el procesamiento interno está permitido, pero no debe afirmarse certeza jurídica absoluta sobre la copia sistemática/retención histórica indefinida.
- La página dice que los ficheros permanecen disponibles al menos 24 horas; eso es una garantía de disponibilidad, no un límite explícito de retención del usuario ni una autorización explícita de conservación indefinida.
- Estado revisado: **apto provisionalmente para uso interno y cálculos derivados no distribuidos**, sujeto a minimizar la copia de datos crudos y no redistribuirlos. Retención histórica de raw data queda como riesgo interpretativo; almacenar preferentemente barras derivadas y metadatos propios.

**Deutsche Börse / Xetra — no asumir gratuidad para análisis avanzado**
- La política DBAG v2.8 (2025) separa datos retrasados de tiempo real. El uso gratuito de delayed data se condiciona a no comercializar los datos, pero la política remite a la lista de precios cuando el uso non-display o display de delayed data no está permitido.
- La Guidance Note V4.0 efectiva 01-08-2026 introduce categorías específicas para productos MiFIR. Las categorías 1, 2, 3 y 7 permiten Non-Display; las tarifas dependen de Device Accesses (Entry 1–2, Medium 3–10, Plus 11–30, Unlimited >30/no control). No es correcto aplicar sin más la conclusión antigua de que el delayed non-display siempre es gratis.
- DBAG define analytics simples como hasta dos series temporales de métricas para un instrumento o hasta dos instrumentos; expresamente excluye análisis técnico avanzado, generación de señales y apoyo/desarrollo de estrategias de inversión. Market Radar hace precisamente screening y señales, por lo que no debe encuadrarse como simple analytics.
- La FAQ anterior señala que almacenamiento puro no cuenta como Device para trading-based activity, pero pueden aplicar otras licencias. Esto no autoriza por sí solo la retención persistente.
- Estado: **no usar Xetra para screening/indicadores hasta verificar el precio y el derecho aplicable al producto MiFIR concreto**. No hace falta contactar; basta consultar los documentos y price list públicos. Si la licencia para Other Application Usage es desproporcionada, descartar el feed.

**Cboe**
- Mantener sólo como candidato técnico complementario. El disclaimer «Not for Trading or Investment Decisions», además de la ausencia de garantía de integridad/continuidad, hace que no sea prudente fundamentar señales de inversión directamente en ese feed. Podría servir para investigación de cobertura/estructura de mercado, siempre revisando sus términos completos.

**Regla de proyecto**
No tratar «scraping» como categoría legal exenta. Para cada fuente evaluar: (a) autorización de acceso automatizado; (b) términos aceptados; (c) extracción de base de datos; (d) uso non-display/derived data; (e) persistencia; (f) redistribución. La ausencia de ánimo de lucro no elimina por sí sola los puntos (b)-(e).

Fuentes oficiales:
- Ley de Propiedad Intelectual española, arts. 133 y 135: https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930
- Euronext Delayed Trade Data terms: https://marketdata.euronext.com/data-reporting-service/trades-file
- Deutsche Börse Market Data Policy v2.8: https://www.mds.deutsche-boerse.com/resource/blob/4028410/8c40e8b49bbbae4adcf9aee2f8193ad6/data/Market%20Data%20Policy%20Guidelines%20and%20FAQ_V2_8.pdf
- Deutsche Börse Non-Display Guidance Note V4.0 (effective 01-08-2026): https://www.mds.deutsche-boerse.com/resource/blob/5322804/5ab2ea48a9787add0f7fc5abbf9e63a4/data/Non-Display%20Guidance%20Note%204_0.pdf
- Cboe delayed transparency terms/disclaimer: https://www.cboe.com/markets/eu/equities/transparency-data/


### 11.8 Lista pública de precios DBAG (01-08-2026)

Se ha localizado la Price List to the Non-Display Agreement v11_01, vigente desde 01-08-2026. Para Xetra Post-Trade muestra tarifas non-display de 480 €/mes (Entry, 1–2 Device Accesses), 880 € (Medium), 1.400 € (Plus) y 2.200 € (Unlimited), antes de IVA. La tarifa es por Market Data Client, producto licenciado y mes.

Importante: la tabla de Xetra Post-Trade deja en blanco las columnas de Index Calculation y Other Application Usage. La política define Other Application Usage como cuantitative analysis, portfolio management, instrument pricing, etc.; y la FAQ excluye expresamente de «simple analytics» el análisis técnico avanzado, la generación de señales y el apoyo a estrategias de inversión. Por tanto, no hay una tarifa pública visible que habilite claramente el uso concreto de Market Radar en Xetra Post-Trade. No inferir que 480 €/mes cubre ese uso: esa cifra corresponde a la columna de actividad de trading basada en Device Access.

La página de descarga de delayed data sigue ofreciendo acceso gratuito 15 minutos retrasado, con archivos disponibles hasta medianoche del siguiente día hábil. Pero acceso gratuito a la descarga no resuelve automáticamente los derechos de uso non-display para análisis avanzado. **Conclusión: descartar Xetra como fuente del screening automatizado hasta que los documentos públicos permitan identificar una licencia aplicable; no contactar al proveedor.**

Fuente: https://www.mds.deutsche-boerse.com/resource/blob/5107644/e6ec5d6e4bd221a24fcd29716f0bc215/data/NonDisplay_Price_List_11_01.pdf ; https://www.mds.deutsche-boerse.com/mds-en/real-time-data/Delayed-data
