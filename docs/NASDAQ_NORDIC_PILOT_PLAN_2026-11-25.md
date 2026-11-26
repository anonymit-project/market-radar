# Nasdaq Nordic Equity — diseño del piloto CSV OHLCV

**Estado: AUTORIZADO un único CSV de cinco días para un instrumento (25-11-2026). Descarga pendiente de acceso al fichero.**  
Fecha: 25-11-2026  
Rama: `research/explorer-design-2026-11-24`

## 1. Objetivo y límites

Comprobar, mediante la inspección posterior de **un único CSV de una sesión completa y un único instrumento**, si Nasdaq Nordic Equity permite reconstruir una barra diaria OHLCV fiable para el ámbito de negociación cubierto por Nasdaq.

Este documento define el procedimiento; no ejecuta ninguna descarga, consulta de endpoint, API, script ni automatización. No se crearán cuentas, no se usarán credenciales, no se contactará con Nasdaq, no se consumirán cuotas y no se incurrirá en costes.

El piloto no valida Nasdaq Baltic, Nasdaq APA, otros venues, el universo completo ni una ingesta recurrente. Tampoco acredita volumen consolidado de mercado.

## 2. Punto de partida verificado y límites

La investigación documental vigente indica:
- Regulatory Reports publica post-trade delayed CSV machine-readable con 15 minutos de retraso; los ficheros se generan cada minuto y la ventana anunciada es de 48 horas.
- La página de Nordic Equity afirma que el CSV descargable por instrumento contiene todos los trades del día actual.
- El uso no comercial se declara gratuito.
- RTS 1 establece campos semánticos para transparencia post-trade de acciones: fecha/hora de ejecución, ISIN, precio, divisa, cantidad, MIC de ejecución, identificador de transacción y flags aplicables.
- La especificación Nordic Equity Last Sale (NLS) v1.2.10 documenta en otro producto Nasdaq identificadores, MMT 5.0 y mensajes CANC/AMND/trade breaks.

**No se puede inferir** que el CSV gratuito tenga las mismas columnas, tipos, identificadores, flags o semántica de corrección que NLS. Tampoco se ha probado que «todos los trades» signifique completitud independiente o incluya operaciones de otros centros.

## 3. Unidad de muestra y selección

Sólo tras autorización expresa:
1. Seleccionar un instrumento líquido de renta variable ordinaria de Nasdaq Nordic Equity, con clase/listing inequívoco.
2. Resolver nombre legal, ticker vigente, ISIN, MIC esperado, moneda, clase y calendario antes de descargar.
3. Elegir una sesión completa reciente ya cerrada, cuyo fichero siga dentro de la ventana publicada de 48 horas.
4. Descargar **un único CSV** desde la ruta oficial Nordic Equity para ese instrumento y sesión. No descargar ficheros minuto a minuto adicionales, otros instrumentos ni ficheros de contraste.
5. Registrar URL/página, hora UTC/local de descarga, fecha de sesión, nombre, tamaño, encoding, delimitador, checksum SHA-256 y versión/fecha de términos visibles.
6. No incorporar el raw a GitHub, al repositorio ni a un informe compartible.

Si el portal no ofrece un fichero único que cubra la sesión completa, detenerse y documentarlo. No sustituirlo por varias descargas sin nueva autorización.

## 4. Inspección del esquema real

Registrar literalmente todas las cabeceras y su orden, tipos observados, formatos de fecha/hora, precisión temporal, separador decimal, delimitador, encoding, nulos, valores distintos relevantes, número de filas, filas malformadas y metadatos de instrumento/sesión.

| Campo semántico | Motivo | Estado antes de muestra |
|---|---|---|
| ISIN | Identidad del instrumento | No confirmado en CSV |
| MIC de ejecución | Ámbito de la barra | No confirmado |
| Fecha/hora de ejecución | Orden y asignación a sesión | No confirmado |
| Precio | OHLC | No confirmado |
| Divisa y price notation | Interpretación del precio | No confirmado |
| Cantidad y unidad | Volumen | No confirmado |
| Transaction ID estable | Duplicados y trazabilidad | No confirmado |
| Publication timestamp / MIC | Separar ejecución y publicación | No confirmado |
| Trade status y flags MMT | Elegibilidad/correcciones | No confirmado |
| Referencia a trade original | Cancelaciones/enmiendas | No confirmado |

RTS 1 y NLS son listas de comprobación semántica, no esquemas sustitutos. No asignar nombres hipotéticos de columnas ni asumir flags no observados.

## 5. Normalización y tratamiento de eventos

1. Preservar cada fila original en una representación temporal de trabajo.
2. Parsear precio, cantidad, moneda, timestamps y flags sin pérdida de precisión; rechazar filas con campos críticos ilegibles.
3. Distinguir execution timestamp de publication timestamp. La sesión y el orden OHLC usan hora de ejecución; la hora de publicación permite reconstruir cuándo se conoció el dato.
4. Identificar si las correcciones llegan como nueva fila/evento, reemplazo, actualización in-place o estado final depurado.
5. Aplicar eventos antes de agregar:
   - **Cancelación:** invalidar la operación original una sola vez; nunca contarla en OHLCV.
   - **Enmienda:** retirar la versión anterior y contabilizar una sola vez la corregida.
   - **Trade break/reversal:** aplicar la semántica observada; no asumir que equivale a una cancelación RTS 1.
   - **Duplicado:** deduplicar sólo con identificadores/reglas verificables. No eliminar filas sólo por compartir precio, cantidad y timestamp.
6. Si no hay ID estable o vínculo suficiente para resolver correcciones, marcar el resultado como no fiable.
7. Mantener auditoría de evento original, acción aplicada, motivo, fila sustituida y resultado.

No se presupone que los flags NLS (CANC/AMND) aparezcan en el CSV gratuito. Documentar valores exactos observados e interpretación respaldada.

## 6. Clasificación de operaciones

Crear una tabla por cada flag/código presente: valor, descripción oficial disponible, interpretación, inclusión/exclusión y efecto en volumen.

Separar operaciones ordinarias price-forming, subastas de apertura/cierre, negociadas/especiales, portfolio, contingent, VWAP, deferred, non-price-forming, cancelaciones, enmiendas y breaks. No incluir ni excluir categorías silenciosamente. Si los flags lo permiten, calcular una variante base de trades ordinarios y otra que incorpore subastas price-forming; mantener categorías especiales aparte hasta entenderlas.

## 7. Reconstrucción OHLCV

Para operaciones válidas y elegibles:
- **Open:** precio de la primera operación por execution timestamp.
- **High:** precio máximo.
- **Low:** precio mínimo.
- **Close:** precio de la última operación por execution timestamp.
- **Volume:** suma de cantidades elegibles, normalizadas a la unidad correcta.

Ordenar por execution timestamp. Si hay empates con precisión insuficiente y no existe secuencia/ID que determine el orden, marcar Open/Close ambiguos; no desempatar arbitrariamente.

No mezclar monedas, unidades, clases ni MIC. No sumar Nasdaq APA a Nasdaq Nordic lit. La salida se identificará como **Nasdaq Nordic venue-specific OHLCV**, nunca como consolidada.

## 8. Completitud y controles de calidad

Evaluar:
- Conteo de filas y operaciones finales tras correcciones.
- Distribución temporal de ejecución/publicación, primera/última operación y actividad intrasesión.
- Duplicados, IDs ausentes/repetidos, filas malformadas, timestamps fuera de sesión y precios/cantidades inválidos.
- Reconciliación de número de operaciones y volumen antes/después de cancelaciones y enmiendas.
- Si el fichero cubre sesión completa o sólo un fragmento incremental.
- Cierre y volumen frente a referencia oficial/independiente, sólo si puede hacerse sin descargar un segundo fichero ni exceder la autorización. Si no, dejarlo pendiente.
- Rango y cierre frente a información oficial Nasdaq disponible sin otra descarga.

Una muestra de un instrumento y una sesión no demuestra completitud general, cobertura de todos los MIC, ausencia de operaciones en otros centros, estabilidad diaria ni calidad histórica.

**Apto técnicamente para siguiente prueba:** esquema legible; identidad inequívoca; precio/cantidad/timestamp presentes; correcciones interpretables; OHLC reproducible; unidad de volumen clara; sin anomalías críticas.

**Apto con limitaciones:** OHLC reconstruible, pero volumen/flags/completitud tienen límites etiquetables que no invalidan el uso previsto.

**No apto:** falta un campo crítico, no se resuelven cancelaciones/enmiendas, Open/Close ambiguos, fichero incompleto o discrepancias materiales inexplicadas.

Superar una muestra no aprueba ingesta recurrente.

## 9. Derechos de uso, almacenamiento y retención

El uso no comercial gratuito y la ventana técnica de 48 horas no acreditan por sí mismos:
- retención indefinida de copias raw;
- retención indefinida de OHLCV derivados;
- automatización diaria/non-display;
- backtesting, indicadores y generación de señales;
- derechos tras cambios de términos o cese de acceso.

La ventana de disponibilidad es una ventana de acceso, no una licencia de archivo. La obligación regulatoria de publicar tampoco concede automáticamente derechos de base de datos o almacenamiento.

**Política conservadora:** no conservar raw permanentemente ni incorporarlo al repo. Si se autoriza la muestra, usarla para la inspección puntual y eliminar la copia local al terminar, salvo autorización expresa adicional y fundamento contractual suficiente. No asumir que eliminar raw habilita conservar derivados: su retención también requiere evaluación. Antes de cualquier job recurrente, documentar por separado acceso, automatización, non-display, transformación, almacenamiento raw, retención derivada, backtesting, outputs privados y terminación. Si los términos públicos no resuelven un derecho material, mantener el uso bloqueado. No contactar con Nasdaq sin autorización específica.

**Dictamen actual:** derechos de almacenamiento histórico raw y derivado no acreditados. No aprobar retención indefinida ni ingesta recurrente. Evaluación documental, no dictamen jurídico.

## 10. Autorizaciones y secuencia

| Paso | Acción | Estado |
|---|---|---|
| 1 | Diseñar procedimiento y controles | Completado |
| 2 | Revisar términos públicos y documentar incertidumbre | Completado a nivel documental |
| 3 | Autorizar expresamente la descarga de un único CSV | **Pendiente del usuario** |
| 4 | Confirmar que el fichero seleccionado es único y cubre sesión completa | Pendiente |
| 5 | Descargar y analizar sólo ese fichero | Bloqueado hasta paso 3 |
| 6 | Emitir informe de esquema, flags, correcciones, OHLCV y calidad | Pendiente |
| 7 | Decidir si procede otra prueba | Pendiente; nueva autorización si implica otra descarga |

La autorización del paso 3 no autoriza descargas adicionales, automatización, APIs, cuentas, contacto, costes ni retención histórica.

## 11. Fuentes oficiales
- Nasdaq Regulatory Reports: https://tradereports.nasdaq.com/
- Nasdaq Nordic Equity Post-Trade: https://tradereports.nasdaq.com/shares/trade-reports/post-trade
- Nasdaq MiFID II delayed data guide: https://www.nasdaq.com/market-regulation/nordic/mifid-ii
- Nasdaq Nordic Equity Last Sale v1.2.10 (producto distinto del CSV público): https://www.nasdaq.com/docs/2026/01/14/Nordic-Equity-Last-Sale-1.2.10_0.pdf
- Commission Delegated Regulation (EU) 2017/587 (RTS 1): https://eur-lex.europa.eu/eli/reg/2017/587

## 12. Estado y conclusión

El piloto está **diseñado, no ejecutado**. Se desconoce el esquema real del CSV y no se ha probado la reconstrucción OHLCV. Nasdaq Nordic Equity sigue como primer candidato técnico, condicionado a muestra autorizada y resolución de retención. No hay aprobación de almacenamiento histórico ni de ingesta recurrente.

## 13. Estado de autorización y primer intento (25-11-2026)

El usuario autorizó expresamente la descarga de **un único CSV** para un instrumento y una sesión completa. La autorización no amplía el alcance a otras descargas, APIs, cuentas, automatización, contacto ni retención histórica.

**Muestra candidata:** Nokia Oyj, ticker NOKIA, Nasdaq Helsinki, ISIN FI0009000681, MIC XHEL. La identificación de instrumento está respaldada por publicaciones oficiales Nasdaq; la página de instrumento encontrada es https://www.nasdaq.com/european-market-activity/shares/nokia?id=TX50063. Sesión candidata: 25-11-2026, la última sesión completa al realizar la comprobación (20:59 CET).

**Bloqueo técnico antes de descargar:** la página de instrumento accesible en la consulta devuelve «Data is currently not available» y no expone el enlace funcional «Download CSV» ni permite comprobar que el fichero ofrecido sea el CSV diario completo. La guía oficial sí describe ese CSV diario individual, pero el navegador disponible no permite activar el control de descarga ni inspeccionar el enlace generado. No se ha usado un endpoint/API alternativo ni se ha descargado ningún fichero. No se sustituirá por los CSV minuto a minuto de Regulatory Reports, porque no equivalen al único fichero de sesión completa solicitado.

**Discrepancia de disponibilidad:** la guía general MiFID II consultada indica 24 horas; la página específica Nordic Equity Post-Trade indica 48 horas. Hasta aclararlo, no asumir una ventana única. Esta discrepancia no afecta a la autorización, pero sí al margen temporal para la muestra.

**Resultado:** autorización concedida; descarga aún no ejecutada. Para continuar sin cambiar el alcance, hace falta acceso al enlace/archivo CSV diario que ofrece el botón oficial «Download CSV» de la ficha de Nokia. Si el usuario descarga ese único fichero desde la ficha oficial y lo adjunta, se podrá inspeccionar el esquema y reconstruir la sesión sin pedirle más datos. No se solicita una descarga adicional.

## 14. Ampliación expresa de alcance: CSV de cinco días (25-11-2026)

El usuario confirma que Nasdaq no ofrece la descarga de un día, pero sí la de cinco días, y autoriza expresamente descargar **un único CSV de cinco días** para el mismo instrumento Nokia Oyj (NOKIA, ISIN FI0009000681, MIC XHEL). Esta autorización sustituye el requisito de una sesión única y permite inspeccionar todas las sesiones contenidas en ese único fichero; no autoriza otros instrumentos, otros ficheros, APIs, endpoints alternativos, automatización ni retención histórica.

La descarga no se ha podido ejecutar desde las herramientas disponibles: la ficha consultable de Nokia no expone el control ni el enlace dinámico de descarga. No se debe fabricar o adivinar el endpoint. Para completar el piloto sin ampliar permisos, el usuario puede adjuntar aquí el CSV de cinco días descargado desde la ficha oficial. Al recibirlo, registrar fechas efectivas, tamaño y hash, inspeccionar el esquema y reconstruir OHLCV por sesión.

La autorización cubre el fichero de cinco días completo, aunque el rango exacto de fechas debe confirmarse leyendo sus registros. No guardar el raw en GitHub ni inferir derechos de retención a partir de esta autorización.

## 15. Diagnóstico local sin compartir el CSV (25-11-2026)

El usuario indica que puede ejecutar Python, pero no puede adjuntar el fichero por el límite de su cuenta. Se añade \`tools/inspect_nasdaq_csv.py\`, herramienta de diagnóstico estructural que:
- usa únicamente la biblioteca estándar de Python;
- lee el CSV localmente, sin red ni dependencias;
- informa cabeceras, tipos aproximados, campos vacíos, cardinalidad y rangos temporales;
- sugiere campos candidatos por nombre;
- no imprime filas de operaciones ni precios y no modifica el CSV original.

Ejecución desde la raíz del repositorio:
\`python tools/inspect_nasdaq_csv.py "ruta/al/CSV.csv"\`

El informe local se guarda como \`nasdaq_csv_diagnostic.txt\`. El usuario puede pegar aquí ese informe (no el CSV). Es una primera fase: después se ajustará el parser al esquema real y se generará un segundo script para reconstruir OHLCV y tratar flags/cancelaciones/enmiendas. No interpretar aún el fichero ni considerar validada la fuente hasta completar esas comprobaciones.

### Corrección del diagnóstico: directiva \`sep=\` (26-11-2026)

El primer informe local detectó 2 columnas llamadas \`sep=\` y campo vacío, con 7 filas. Esto indica que el CSV comienza con la directiva de Excel \`sep=;\`; el inspector inicial la interpretó erróneamente como cabecera. No es evidencia de que el fichero carezca de datos de operaciones.

Se ha corregido \`tools/inspect_nasdaq_csv.py\` para reconocer y omitir esa primera línea y utilizar el separador declarado. El usuario debe repetir el diagnóstico con la versión actualizada. No se ha compartido ni solicitado el contenido bruto del CSV.

### Resultado del primer diagnóstico local (26-11-2026)

El informe del usuario corresponde a \`nokia_20261125_210111.csv\`, tamaño 632 bytes, UTF-8 con BOM, separador \`; \` (directiva inicial \`sep=;\`), 7 filas contabilizadas por el inspector antiguo y 2 columnas aparentes (\`sep=\` y campo vacío). El resultado **no describe el esquema real**: el inspector trató la directiva Excel \`sep=;\` como cabecera y desplazó la lectura una línea.

Se ha actualizado el inspector para omitir esa directiva y respetar el separador declarado. El diagnóstico anterior queda invalidado; no extraer conclusiones sobre campos, número de operaciones o validez del fichero hasta repetirlo con la versión corregida. Próximo paso: el usuario vuelve a ejecutar el script actualizado sobre el mismo CSV autorizado y comparte únicamente el informe de diagnóstico, nunca el CSV bruto.



## 16. Segundo diagnóstico local: CSV de barras diarias (26-11-2026)

El usuario ejecutó el inspector corregido sobre el mismo y único CSV autorizado. El informe estructural devuelve seis filas y once columnas:

`Date`, `Bid`, `Ask`, `Opening price`, `High price`, `Low price`, `Closing price`, `Average price`, `Total volume`, `Turnover`, `Trades`.

El rango temporal observado es 2026-11-18 a 2026-11-25. Los seis valores de cada columna están informados como no vacíos y distintos. El fichero parece contener **barras/estadísticas diarias ya agregadas**, no operaciones individuales. Es una inferencia basada en los nombres y cardinalidad; todavía no se ha inspeccionado el significado oficial de los campos ni sus valores.

Consecuencias:
- Se abandona para este fichero la hipótesis de reconstruir OHLCV desde el tape de operaciones.
- No es posible evaluar cancelaciones, enmiendas, trade breaks, secuencia intradía ni deduplicación de trades individuales.
- `Bid` y `Ask` son candidatos a cotizaciones, no identificadores.
- OHLCV podría estar ya suministrado por Nasdaq, pero su semántica, unidad, moneda y alcance siguen pendientes.
- Seis filas no demuestran que estén presentes todas las sesiones esperadas ni que el volumen sea consolidado.

### Segundo script local

Se añade `tools/validate_nasdaq_daily_bars.py`, sólo biblioteca estándar, sin red y de lectura local. Comprueba campos requeridos, parseo numérico/fechas, duplicados y orden de fechas, coherencia OHLC, Average Price dentro del rango, Bid/Ask, valores negativos y consistencia básica entre volumen y número de operaciones. El informe no imprime precios, volúmenes, turnover ni filas individuales.

Ejecución desde la carpeta del repositorio:

```powershell
python tools/validate_nasdaq_daily_bars.py "C:\Users\crist\Downloads\nokia_20261125_210111.csv"
```

El informe se guarda como `nasdaq_daily_bars_validation.txt`. El usuario compartirá sólo ese informe, nunca el CSV bruto.

### Criterio de interpretación

Un resultado sin anomalías críticas sólo demuestra coherencia interna básica. No valida que `Total volume` sea acciones, que `Turnover` use una moneda/unidad concreta, que `Average price` sea VWAP, que el fichero cubra todas las operaciones del mercado ni que las barras sean volumen consolidado. Tampoco resuelve derechos de retención histórica ni autoriza ingesta recurrente.

**Estado:** esquema aparente identificado; validación semántica y aritmética pendiente de ejecutar localmente.

## 17. Validación local de barras diarias y revisión documental (26-11-2026)

El usuario ejecutó `tools/validate_nasdaq_daily_bars.py` localmente sobre el mismo y único CSV autorizado (`nokia_20261125_210111.csv`) y compartió sólo el informe agregado; el raw no se ha recibido ni incorporado al repositorio.

**Resultado observado:**
- Seis filas, once columnas esperadas; ninguna columna obligatoria ausente ni filas sobrantes.
- Fechas legibles, únicas y dentro del rango 2026-11-18 a 2026-11-25; no están en orden ascendente. El informe no permite concluir si el orden es descendente, por lo que queda como observación menor.
- Todos los campos numéricos se parsearon sin errores ni vacíos.
- Cero anomalías en controles OHLC, Average price dentro del rango, Bid/Ask, volumen no negativo, Trades entero/no negativo, precios positivos y volumen cero con operaciones positivas.
- Resultado del validador: **SIN ANOMALÍAS CRÍTICAS DETECTADAS**.

Esto acredita coherencia estructural y aritmética básica de las seis filas, no exactitud, completitud, cobertura de mercado, ausencia de sesiones omitidas ni calidad de una serie histórica. No inferir sesiones ausentes por huecos de días naturales.

**Contraste documental oficial:**
- La página de Nasdaq Nordic/Baltic Equity Data describe su producto End-of-Day como incluyendo cierre, VWAP, máximos/mínimos, número de operaciones, precio medio, volúmenes e información de mercado/bolsa: https://www.nasdaq.com/products/data/equities/nordic-baltic
- La página Nordic End of Day Reports describe información de operaciones (último, máximo/mínimo, volumen y turnover) y mejor bid/ask al cierre; declara que la licencia EOD permite uso interno sin restricciones, pero no redistribuir el fichero completo tal como se recibe: https://www.nasdaq.com/products/data/nordic-baltic/nordic-end-of-day-reports
- Estas descripciones hacen plausible que el CSV contenga estadísticas EOD preagregadas, pero **no identifican el producto/licencia concreto del fichero del usuario** ni prueban que sus campos tengan exactamente esas definiciones. No trasladar automáticamente los términos del producto Nordic End of Day Reports al CSV descargado.

**Conclusión y estado:**
- Piloto técnico local: **validación estructural/aritmética superada con limitaciones**.
- No se ha reconstruido OHLCV desde trades; el fichero ya parece contener barras/estadísticas agregadas.
- Quedan sin resolver la definición y unidad de Total volume, moneda/unidad de Turnover, definición exacta de Average price (no etiquetar como VWAP sin prueba), alcance de Bid/Ask y cobertura por venue/MIC.
- No queda aprobado Nasdaq como fuente de producción, ni la retención histórica, automatización o ingesta recurrente. No se ha contactado con Nasdaq ni se han usado APIs/cuotas ni descargado más ficheros.
- Próximo paso: identificar con certeza la página/producto y términos de origen del CSV, y buscar documentación pública específica de las cabeceras/unidades. Si no puede identificarse públicamente, mantener la semántica como no confirmada y no usar volumen/turnover en señales cuantitativas.
