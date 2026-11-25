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

