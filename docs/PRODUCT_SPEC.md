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

## 7. Usuarios y carteras virtuales
Tres personas comparten el mismo conjunto de señales. Cada una puede tener cartera virtual independiente; funcionalidad secundaria. Separar rendimiento del sistema de señales y rendimiento de las operaciones virtuales. Acceso compartido con perfiles nombre/PIN fue una idea, no una decisión; autenticación pendiente.

## 8. Notificaciones
- Telegram: nuevas oportunidades relevantes, sin spam, con datos esenciales y enlace a ficha.
- Email: resumen semanal y comparación entre predicciones y resultados posteriores.
Proveedor, frecuencia exacta y costes de email pendientes.

## 9. No objetivos
- Ejecución de órdenes reales.
- Custodia, broker o asesoramiento personalizado.
- Gestión de carteras reales.
- Emitir señales continuamente para aparentar actividad.
