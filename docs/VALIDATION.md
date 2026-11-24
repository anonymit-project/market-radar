# Validation, Backtesting & Paper Trading

## 1. Principio
Una señal sólo puede evaluarse usando información que estaba disponible en su instante de emisión. Conservar el snapshot original, incluidos precio, timestamp, fuente, datos y versiones. No reescribir evidencia retrospectivamente.

## 2. Riesgos de sesgo
- Look-ahead bias: usar datos publicados después del momento de señal.
- Survivorship bias: excluir empresas deslistadas o desaparecidas.
- Overfitting: ajustar reglas al histórico hasta capturar ruido.
- Selección: publicar sólo señales ganadoras o periodos favorables.
- Corporate actions: tratar incorrectamente splits, dividendos, cambios de ticker.
- Revisión de datos: usar series corregidas posteriormente como si fueran conocidas entonces.
- Ejecución: asumir fill al precio observado, ignorando retrasos, spread, liquidez y slippage.

## 3. Registro inmutable
Cada señal guarda timestamp, precio observado y fuente/frescura, entrada/máximo/objetivo/stop, horizonte/caducidad, indicadores, eventos, evidencia, algoritmo/modelo/schema version. Registrar además universo elegible, reglas activas y razón de abstención cuando aplique.

## 4. Ventanas de evaluación
Evaluar, según horizonte: 1, 5, 10, 30 y 90 días; plazos más largos para señales de largo horizonte. Definir si se usan sesiones bursátiles o días naturales. Señales de cripto tienen calendario distinto.

## 5. Métricas
- Porcentaje de señales que alcanzan objetivo antes que stop.
- Rentabilidad neta de costes, spread y slippage.
- Expectancy, retorno medio y mediano.
- Drawdown y distribución de pérdidas/ganancias.
- Benchmark apropiado por activo, mercado y horizonte.
- Porcentaje de señales ejecutables respetando máximo de entrada.
- Tiempo hasta objetivo, stop o caducidad.
- Calibración de confianza y cobertura de abstención.
No utilizar sólo porcentaje de acierto: una tasa alta puede coexistir con pérdidas netas.

## 6. Reglas de simulación
- Entrada sólo si el precio negociable respeta el máximo de entrada.
- Si el precio abre con gap por encima del máximo, no simular compra.
- Definir prioridad cuando objetivo y stop aparecen dentro de la misma vela; usar datos de mayor granularidad o asumir el escenario conservador.
- Incorporar comisiones, spread, slippage, FX y horarios.
- Separar señal de evitar exposición de operación short; short exige borrow, financiación, margen y reglas específicas.
- Las cotizaciones retrasadas no justifican ejecuciones a precio actual.

## 7. Protocolo de paper trading
1. Congelar versión de reglas/modelo.
2. Emitir señales en tiempo real y guardarlas antes de conocer resultados.
3. No modificar señales pasadas.
4. Registrar precio disponible, precio teórico de entrada y fill simulado realista.
5. Revisar semanalmente incidencias de datos, eventos y ejecución.
6. Mantener benchmark y universo fijo versionado.
7. Publicar métricas con tamaño de muestra e intervalos de incertidumbre.
8. No pasar a producción sólo por resultados de un periodo corto.

## 8. Criterios de salida de validación
Pendientes de fijar tras definir estrategias. Como mínimo: muestra suficiente, rentabilidad neta robusta, drawdown tolerable, estabilidad por periodos/mercados, calidad de ejecución y calibración de confianza. No inventar umbrales antes de tener una estrategia concreta.
