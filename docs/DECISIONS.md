# Decisions Log

## Confirmadas
- Producto informativo; no broker ni ejecución automática.
- Activos: acciones, ETF y criptomonedas.
- Mercados principales: Estados Unidos y Europa.
- Tres horizontes: corto (1–10 días), medio (2 semanas–6 meses), largo (6–36 meses).
- Señales de compra, venta/evitar exposición y oportunidades tras caídas/rebotes.
- Enfoque conservador; abstención válida; calidad sobre cantidad.
- Precio observado, frescura y niveles de entrada/salida explícitos.
- No perseguir precio si supera máximo de entrada.
- PWA mobile-first, sin app nativa.
- Telegram y resumen semanal por email.
- Tres usuarios, señales comunes y carteras virtuales independientes.
- Ledger inmutable y evaluación objetiva.
- Preferencia por coste inicial cero y servicios cloud de bajo mantenimiento.
- IA estructura noticias; reglas deterministas deciden señales.

- GitHub es la fuente persistente de verdad del proyecto; los chats son temporales.
- Todo chat debe cerrar con un siguiente paso inequívoco: pregunta concreta para continuar o prompt de relevo completo para un chat nuevo.

## Restricciones
- No asumir acceso a InvestingPro.
- No centrar noticias sólo en Expansión.
- No scrapear contenido protegido ni usar suscripciones personales para extracción automatizada.
- No contratar sin autorización.
- No programar aplicación funcional antes de validar datos, licencias, costes y arquitectura.
- No presentar hipótesis como decisiones.
- No dejar al usuario sin una acción clara al terminar un chat; aplicar docs/WORKFLOW.md.

## Hipótesis / candidatas no aprobadas
- GitHub Actions u otro scheduler gestionado.
- Supabase/Postgres.
- PWA estática.
- Telegram Bot API y proveedor SMTP/email.
- Proveedores de mercado y noticias listados en DATA_SOURCES.md.

## Cuestiones abiertas
1. ¿Qué licencia permite un dashboard privado para tres personas, con datos/derivados, histórico, Telegram y email?
2. ¿Qué bolsas europeas y ETF son imprescindibles?
3. ¿Qué latencia es necesaria para cada horizonte y tipo de señal?
4. ¿Qué definición formal tendrán compra moderada/fuerte y venta/evitar?
5. ¿Cómo se definirán entrada, máximo, objetivo, stop, caducidad e invalidación por estrategia?
6. ¿Qué universo inicial y benchmarks se utilizarán?
7. ¿Qué mecanismo de autenticación separa a los tres usuarios?
8. ¿Qué proveedor de email, hosting, base de datos y scheduler cumple límites/coste?
9. ¿Qué política de retención y uso de datos con modelos LLM permite cada proveedor?
10. ¿Qué criterios cuantitativos autorizan pasar de paper trading a uso continuado?

## Registro de cambios
- 2026-11-24: primera consolidación documental a partir del contexto del proyecto. Investigación documental inicial de proveedores; ningún proveedor aprobado.
- 2026-11-24: README actualizado; se establece GitHub como fuente persistente de contexto y protocolo de relevo entre chats.
- 2026-11-24: se formaliza el cierre obligatorio de cada chat con pregunta concreta o prompt de relevo completo; detalle en docs/WORKFLOW.md.
