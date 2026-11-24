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


## Fase 1B — Validación de proveedores para un único usuario (alcance vigente)

**Alcance:** uso privado del titular, sin compartir datos ni resultados con familiares o terceros.

- [x] Sustituir el requisito de tres usuarios por uso individual.
- [x] Mantener la auditoría anterior como histórico, sin usarla como requisito de selección.
- [ ] Reevaluar EODHD, Twelve Data, FMP, Massive, Alpaca, Finnhub, Alpha Vantage y Stooq bajo licencias personales/individuales.
- [ ] Para cada proveedor, verificar expresamente: dashboard privado del titular; API/automatización; almacenamiento local y caché; histórico y backtesting; indicadores/señales no compartidos; alertas Telegram/email al titular; procesamiento por LLM; retención y borrado al cancelar; derechos de exchange.
- [ ] Verificar fuentes de noticias: GDELT como candidato de metadatos con atribución; Marketaux y APIs de noticias según licencia individual.
- [ ] Consultar por escrito sólo los puntos materiales que no queden resueltos en términos/documentación oficial. No enviar las antiguas consultas de licencias multiusuario.
- [ ] Comparar cobertura USA/EU/ETF/cripto, granularidad, latencia, histórico, cuotas y coste para el universo y frecuencia previstos.
- [ ] No ejecutar pruebas API, consumir cuotas ni usar credenciales hasta autorización expresa.

**Criterio de salida:** shortlist de proveedor(es) cuyo uso individual cubra el caso real, con restricciones, coste, fuentes subyacentes y evidencia oficial documentados. Ningún proveedor queda aprobado hasta terminar esa evaluación. No iniciar desarrollo antes.

**Siguiente paso:** rehacer la comparación de licencias y capacidades con EODHD como candidato prioritario para históricos y backtesting personal, contrastándolo con Twelve Data, FMP y Massive. Después evaluar feeds especializados (Alpaca/Finnhub) y alternativas gratuitas.

## Regla de continuidad
Al finalizar cada chat, indicar siempre el siguiente paso del usuario:
- Si la tarea puede continuar de forma eficiente en el mismo chat, cerrar con una pregunta concreta que desbloquee el siguiente paso.
- Si conviene un chat nuevo, entregar un prompt de relevo completo, listo para copiar y pegar.
Nunca cerrar con un «¿cómo seguimos?» genérico ni dejar el siguiente paso implícito.
