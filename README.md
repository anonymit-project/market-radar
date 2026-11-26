# Market Radar

Radar conservador para explorar oportunidades en acciones cotizadas de EE. UU. y Europa; ETF y criptomonedas se mantienen en seguimiento separado. Identifica y documenta posibles oportunidades; **no es un broker, no gestiona carteras reales y no ejecuta órdenes**.

## Principios
- Calidad y trazabilidad de señales por encima de cantidad; abstención cuando falte evidencia.
- No perseguir precios: si el precio supera el máximo aceptable de entrada, indicar «oportunidad perdida / esperar retroceso».
- Separar hechos confirmados, interpretación y reacción posterior del mercado.
- La IA estructura información; las decisiones de señal corresponden a reglas deterministas.
- Conservar todas las señales, incluidas las fallidas, y evaluar sin sesgos retrospectivos.
- Validar datos, licencias, costes y arquitectura antes de desarrollar o contratar.

## Estado
**Fase 1 — investigación y validación de fuentes.** Ningún proveedor ni arquitectura está aprobado. No hay desarrollo funcional ni contrataciones. Objetivo inicial: **coste cero**. Priorizar exclusivamente opciones gratuitas durante el prototipo y la primera puesta en marcha. Sólo estudiar alternativas de pago cuando el sistema gratuito funcione y sus limitaciones reales justifiquen la mejora. No contratar sin autorización expresa.

## Alcance acordado
- Exploración: acciones cotizadas de EE. UU. y Europa, universo amplio y sin restricción sectorial. ETF y criptomonedas permanecen en seguimiento separado.
- Horizontes: corto (1–10 días), medio (2 semanas–6 meses) y largo (6–36 meses).
- Señales de compra moderada/fuerte, venta o evitar exposición, oportunidades tras caídas/rebotes y efectos directos/indirectos de acontecimientos.
- Un único usuario privado; sin cuentas familiares ni acceso compartido.
- Dashboard web mobile-first instalable como PWA; no app nativa.
- Telegram para alertas relevantes al titular y email para resumen semanal al titular.
- Registro inmutable de señales y evaluación histórica objetiva.

## Prototipo visual
- [Abrir y revisar el mock-up](prototype/README.md) — maqueta estática, sin APIs ni datos reales.

## Documentación
- [Especificación de producto](docs/PRODUCT_SPEC.md)
- [Diseño del Explorador de acciones](docs/EXPLORER_DESIGN.md)
- [Investigación de fuentes europeas post-trade](docs/EUROPEAN_POST_TRADE_RESEARCH_2026-11-24.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Inteligencia de eventos](docs/EVENT_INTELLIGENCE.md)
- [Fuentes de datos y licencias](docs/DATA_SOURCES.md)
- [Validación y backtesting](docs/VALIDATION.md)
- [Decisiones y cuestiones abiertas](docs/DECISIONS.md)
- [Próximos pasos](docs/NEXT_STEPS.md)
- [Protocolo de trabajo y continuidad](docs/WORKFLOW.md)

## Método de trabajo con ChatGPT
- Este repositorio es la fuente persistente de verdad; los chats son espacios de trabajo temporales.
- Un chat principal coordina prioridades y decisiones; las tareas sustanciales pueden desarrollarse en chats separados.
- Cada tarea sustancial debe comenzar leyendo README.md y los documentos pertinentes, y terminar actualizando la documentación, registrando decisiones y verificando los cambios.
- **Todo chat debe terminar con un siguiente paso explícito:** una única pregunta concreta si se continúa en el mismo chat, o un prompt de relevo completo y listo para copiar si se abre otro. Nunca dejar al usuario sin saber qué hacer.
- No asumir decisiones pendientes ni contratar servicios, publicar datos o modificar alcance sin autorización.
- El protocolo completo está en [docs/WORKFLOW.md](docs/WORKFLOW.md).

## Regla de evidencia
Cobertura, precios, cuotas, latencia, endpoints, licencias y permisos deben comprobarse en documentación oficial vigente y, cuando sea posible, mediante pruebas reproducibles. Un candidato no es un proveedor validado hasta superar esas comprobaciones. Diferenciar hechos, hipótesis e inferencias.

## Aviso
Las señales son hipótesis sujetas a incertidumbre, no garantías de rentabilidad ni asesoramiento personalizado.

## Piloto Nasdaq Nordic (diseño)

- [Diseño del piloto CSV Nasdaq Nordic Equity](docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md) — procedimiento, campos, correcciones, OHLCV, calidad y derechos. **No se ha descargado ninguna muestra; requiere autorización expresa.**

**Estado del piloto Nasdaq Nordic (25-11-2026):** autorización recibida para un único CSV diario de Nokia Oyj (NOKIA, ISIN FI0009000681, MIC XHEL), pero no se descargó porque la ficha de instrumento consultable no expuso el botón/enlace «Download CSV». No se usaron APIs ni ficheros minuto a minuto. Ver [estado y procedimiento](docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md).

**Piloto Nasdaq Nordic:** el único CSV autorizado de Nokia contiene seis barras/estadísticas diarias aparentes. El validador local no detectó anomalías críticas estructurales ni aritméticas; esto no acredita exactitud, completitud, cobertura, semántica de volumen/turnover ni derechos de retención. Nasdaq no queda aprobado para producción ni ingesta recurrente. Ver [plan y límites](docs/NASDAQ_NORDIC_PILOT_PLAN_2026-11-25.md).

