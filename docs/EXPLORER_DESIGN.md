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
