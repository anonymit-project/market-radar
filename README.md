# Market Radar

Radar conservador de oportunidades de inversión en acciones, ETF y criptomonedas. Identifica y documenta posibles oportunidades; **no es un broker, no gestiona carteras reales y no ejecuta órdenes**.

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
- Acciones, ETF y criptomonedas; EE. UU. y Europa como mercados principales.
- Horizontes: corto (1–10 días), medio (2 semanas–6 meses) y largo (6–36 meses).
- Señales de compra moderada/fuerte, venta o evitar exposición, oportunidades tras caídas/rebotes y efectos directos/indirectos de acontecimientos.
- Un único usuario privado; sin cuentas familiares ni acceso compartido.
- Dashboard web mobile-first instalable como PWA; no app nativa.
- Telegram para alertas relevantes al titular y email para resumen semanal al titular.
- Registro inmutable de señales y evaluación histórica objetiva.

## Documentación
- [Especificación de producto](docs/PRODUCT_SPEC.md)
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
