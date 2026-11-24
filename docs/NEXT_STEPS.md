# Next Steps

## Fase 0 — Documentación y control de contexto
- [x] Consolidar alcance, principios, arquitectura lógica y pendientes.
- [x] Publicar documentación inicial en GitHub.
- [x] Definir GitHub como fuente persistente de contexto y relevo entre chats.
- [x] Formalizar protocolo de trabajo y cierre obligatorio de cada chat en docs/WORKFLOW.md.
- [x] Referenciar el protocolo desde README.md y DECISIONS.md.
- [ ] Mantener DECISIONS.md actualizado tras cada decisión.

## Fase 1 — Validación de fuentes de datos (actual)
1. Crear una matriz por activo/bolsa/endpoint para EODHD, Twelve Data, FMP, Massive, Alpaca, Finnhub, Alpha Vantage, Stooq y fuentes primarias.
2. Verificar documentación oficial, planes, cuotas, histórico, frescura y cobertura.
3. Analizar licencias de uso interno, display a tres usuarios, derivados, almacenamiento, redistribución y uso con IA.
4. Solicitar aclaración comercial por escrito a proveedores finalistas.
5. Ejecutar pruebas reproducibles con un conjunto común de símbolos USA/EU/ETF/cripto, sólo tras autorización para consumir cuotas o usar credenciales.
6. Comparar calidad OHLCV, ajustes, latencia, huecos, símbolos deslistados y news metadata.
7. Elaborar coste mensual realista con frecuencia y universo definidos.
**Entregable:** matriz de resultados, scripts de prueba, evidencias, riesgos y recomendación respaldada. Sin contratación.

## Fase 2 — Viabilidad de Event Intelligence
- Seleccionar fuentes autorizadas y flujo de fuentes primarias.
- Evaluar LLMs gratuitos/de bajo coste, costes por evento y límites.
- Definir JSON Schema, taxonomía, deduplicación y resolución de entidades.
- Crear conjunto de evaluación etiquetado y medir precisión/calibración.
- Diseñar grafo de relaciones con evidencia y validez temporal.
**Entregable:** prototipo aislado y evaluación cuantitativa, sin motor de trading.

## Fase 3 — Arquitectura respaldada por pruebas
- Comparar scheduler, base de datos, hosting, PWA, Telegram y email.
- Estimar cuotas, coste, disponibilidad, backups, seguridad y mantenimiento.
- Definir modelo de datos, contratos API y observabilidad.
**Entregable:** ADR/arquitectura aprobada con costes y límites demostrados.

## Fase 4 — Motor cuantitativo y ledger
- Definir estrategias explícitas y reglas deterministas.
- Implementar versionado, abstención, precios ejecutables y registro inmutable.
- Crear backtesting point-in-time sin sesgos.
**Entregable:** resultados reproducibles y revisión crítica.

## Fase 5 — Paper trading
- Ejecutar señales sin órdenes reales.
- Medir ejecución teórica realista, calidad, precisión, rentabilidad y drawdown.
- Mantener fallos visibles y reglas congeladas por periodo.
**Entregable:** informe de validación y decisión de continuar/no continuar.

## Fase 6 — Dashboard y notificaciones
Sólo tras validar fases anteriores: PWA, autenticación de tres usuarios, histórico, estadísticas, carteras virtuales, Telegram y email.

## Condiciones de avance
No saltar de fase por entusiasmo. Cada fase debe terminar con evidencias, decisiones, costes y riesgos. No contratar ni publicar datos a usuarios hasta confirmar licencias.


## Regla de continuidad
Al finalizar cada chat, indicar siempre el siguiente paso del usuario:
- Si la tarea puede continuar de forma eficiente en el mismo chat, cerrar con una pregunta concreta que desbloquee el siguiente paso.
- Si conviene un chat nuevo, entregar un prompt de relevo completo, listo para copiar y pegar.
Nunca cerrar con un «¿cómo seguimos?» genérico ni dejar el siguiente paso implícito.


## Fase 1B — Cierre de licencias para tres familiares (prioridad inmediata)

- [x] Definir el caso exacto: tres personas físicas, dashboard autenticado, backend único, datos e históricos compartidos, derivados/señales, backtesting, Telegram/email y LLM.
- [x] Contrastar políticas oficiales de EODHD, Twelve Data, FMP, Massive, Alpaca, Finnhub, Alpha Vantage y Stooq.
- [x] Contrastar GDELT y Marketaux para noticias/eventos.
- [x] Documentar qué está permitido para un titular, qué está prohibido compartir y qué requiere licencia/confirmación.
- [x] Preparar consultas escritas individualizadas y plantilla común.
- [ ] Enviar consultas a proveedores finalistas sólo con autorización del usuario (ninguna se ha enviado).
- [ ] Registrar respuesta íntegra, persona/fecha, plan, cláusulas, costes, exchanges y condiciones de cada proveedor.
- [ ] Descartar proveedores que no autoricen por escrito los tres usuarios o cuyo coste/licencia no resulte razonable.
- [ ] Sólo después, cerrar matriz técnica de cobertura, latencia, histórico, cuotas y coste total de los proveedores que sí permitan el uso.
- [ ] No ejecutar pruebas API ni consumir cuotas/credenciales hasta autorización expresa.

**Criterio de salida:** autorización contractual o respuesta escrita suficientemente concreta para los tres usuarios y todos los canales/outputs previstos, incluyendo derechos de exchanges; coste completo conocido; política de almacenamiento/IA clara. Sin esto, no hay proveedor aprobado y no se inicia desarrollo.

**Siguiente decisión del usuario:** autorizar que se envíen las consultas escritas a los proveedores finalistas. Recomendación operativa: empezar por Twelve Data, EODHD, Massive y FMP; añadir Alpaca/Finnhub si el coste y cobertura USA justifican negociar; dejar Alpha Vantage y Stooq como candidatos secundarios. GDELT puede evaluarse por separado para metadatos de noticias.
