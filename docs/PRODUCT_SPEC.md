# Product Specification

## 1. Propósito y límites
Market Radar identifica oportunidades potenciales de compra, venta/evitar exposición y movimientos tras caídas o rebotes. Es una herramienta informativa, no un broker ni un gestor de cartera. No ejecuta órdenes ni calcula cuánto debe invertir una persona. Prioridad: precisión, evidencia y capacidad de abstención, no volumen de alertas.

El ejemplo motivador fue detectar una posible oportunidad antes de una subida relevante (p. ej. NVIDIA), sin utilizar información posterior para justificar retrospectivamente una señal.

## 2. Universo
- Activos: acciones, ETF y criptomonedas.
- Mercados principales: EE. UU. y Europa.
- Resto del mundo: sólo oportunidades excepcionales o relaciones sectoriales/eventos justificables.
- Horizontes: corto 1–10 días; medio 2 semanas–6 meses; largo 6–36 meses.

La cobertura real dependerá de los proveedores y se documentará por instrumento, mercado, bolsa, moneda y calidad de datos.

## 3. Tipos de señal
- Compra moderada.
- Compra fuerte.
- Venta / evitar exposición.
- Oportunidad tras caída, rebote o posible sobrerreacción.
- Efectos directos e indirectos de acontecimientos sobre empresas relacionadas.

«Venta» no equivale automáticamente a una operación corta rentable. Separar señal de reducción/evitación de exposición y short simulado, con reglas de ejecución y costes propios.

## 4. Contrato mínimo de una señal
Cuando exista información, almacenar:
- Activo, ticker, mercado, moneda y clase.
- Tipo, intensidad, horizonte y timestamp de emisión.
- Precio observado, timestamp, proveedor y frescura (tiempo real, retrasado, cierre, etc.).
- Zona de entrada, máximo aceptable de entrada, objetivo, stop orientativo.
- Caducidad, estado y condiciones de invalidación.
- Justificación cuantitativa, indicadores y parámetros.
- Eventos asociados, fuentes y evidencia.
- Versión de algoritmo, reglas, modelo y esquema.

Si el precio supera el máximo aceptable, no perseguirlo: marcar «oportunidad perdida / esperar retroceso». Una cotización retrasada nunca debe presentarse como ejecutable en tiempo real. Los niveles son orientativos y deben indicar supuestos, costes y método de cálculo.

## 5. Estados de señal
Estados iniciales propuestos (pendiente de formalizar): candidate, active, entry_missed, invalidated, expired, target_hit, stop_hit, closed_by_rule. Registrar transiciones con timestamp; no sobrescribir el estado histórico. Una señal cancelada o fallida permanece visible.

## 6. Dashboard PWA
Mobile-first, instalable desde navegador Android/iOS; no aplicación nativa ni publicación en tiendas.
1. Radar: oportunidades ordenadas por calidad y urgencia; precio/frescura, entrada, máximo, objetivo, stop, horizonte, caducidad, estado, explicación y fuentes.
2. Ficha de activo: explicación cuantitativa, eventos, fuentes, historial de señales y evolución del precio.
3. Histórico: todas las señales, incluidas fallidas.
4. Estadísticas: precisión, rentabilidad, drawdown, benchmarks y desgloses por horizonte/mercado/tipo.
5. Ajustes: usuarios, preferencias y notificaciones.

El foco visual es el radar, no el seguimiento de inversiones.

## 7. Usuario y cartera virtual
Un único usuario privado (el titular). No hay usuarios adicionales, acceso familiar ni redistribución de datos o señales. La cartera virtual, si se mantiene, será individual y secundaria. Separar rendimiento del sistema de señales y rendimiento de las operaciones virtuales.

## 8. Notificaciones
- Telegram: nuevas oportunidades relevantes, sin spam, con datos esenciales y enlace a ficha.
- Email: resumen semanal y comparación entre predicciones y resultados posteriores.
Proveedor, frecuencia exacta y costes de email pendientes.

## 9. No objetivos
- Ejecución de órdenes reales.
- Custodia, broker o asesoramiento personalizado.
- Gestión de carteras reales.
- Emitir señales continuamente para aparentar actividad.


## 10. Restricción presupuestaria inicial
- La primera versión debe construirse y operar con servicios y fuentes de coste cero, siempre que sus licencias y límites lo permitan.
- No se contratarán planes de pago durante la fase inicial. Sólo se estudiarán cuando el sistema gratuito esté funcionando y se hayan medido sus limitaciones reales.
- «Gratis» no prevalece sobre legalidad, calidad, estabilidad o seguridad; no usar fuentes sin derechos suficientemente claros.


## Universo inicial de seguimiento — v1 (24-11-2026)

El usuario confirma incluir obligatoriamente NVIDIA, Microsoft y Meta. Se propone el siguiente universo de 12 instrumentos para validar cobertura y diseñar el radar; **no son recomendaciones de compra ni una cartera objetivo**:

| # | Instrumento | Símbolo de referencia | Mercado / función |
|---:|---|---|---|
| 1 | NVIDIA | NVDA | EE. UU.; semiconductores/IA |
| 2 | Microsoft | MSFT | EE. UU.; software/cloud |
| 3 | Meta Platforms | META | EE. UU.; plataformas/publicidad/IA |
| 4 | Amazon | AMZN | EE. UU.; comercio/cloud |
| 5 | Johnson & Johnson | JNJ | EE. UU.; salud; diversificación sectorial |
| 6 | ASML | ASML (Euronext Amsterdam) | Europa; semiconductores/equipamiento |
| 7 | SAP | SAP (Xetra) | Europa; software empresarial |
| 8 | Banco Santander | SAN (BME Madrid) | Europa; banca |
| 9 | SPDR S&P 500 ETF Trust | SPY | ETF USA; benchmark de grandes compañías estadounidenses |
| 10 | Vanguard FTSE All-World UCITS ETF | VWCE (Xetra) | ETF UCITS global; benchmark diversificado |
| 11 | Bitcoin | BTC/USD | Cripto |
| 12 | Ethereum | ETH/USD | Cripto |

Los símbolos exactos por proveedor pueden variar; resolver ticker, MIC/bolsa, moneda y tipo de instrumento antes de comparar datos.

### Criterio de diversificación sectorial: Johnson & Johnson (JNJ)

Se sustituye CNR por JNJ en el universo inicial. El objetivo es incorporar el sector salud como referencia no tecnológica y evitar que el conjunto de prueba dependa de una minera de carbón cíclica y de alto riesgo. La inclusión de JNJ es para monitorización y validación de datos, no una recomendación de compra ni una conclusión sobre su valoración.

CNR puede incorporarse más adelante si se decide analizar específicamente materias primas, energía o transición energética.

### Cadencia operativa v1
- No se exige intradía ni streaming/WebSocket.
- Una ejecución diaria tras el cierre de los mercados correspondientes actualizará precios EOD, fundamentals/noticias disponibles y reglas.
- Segunda ejecución opcional sólo para novedades materiales o alertas de riesgo; no generar mensajes si no cambia la evaluación.
- Para mercados USA y Europa, respetar horarios, festivos y zonas horarias. Cripto opera 24/7, pero la señal diaria debe usar un corte horario definido y consistente.
- Las alertas serán para el titular, máximo orientativo de 1–2 resúmenes al día, con prioridad a cambios de tesis, resultados, eventos relevantes o niveles de entrada/salida. No prometer datos en tiempo real.
- Si una fuente gratuita no aporta precio fresco o histórico suficiente, etiquetar la carencia y abstenerse; nunca presentar dato retrasado como cotización ejecutable.
