# Event Intelligence Engine

## 1. Objetivo
Convertir noticias, filings y acontecimientos no estructurados en hechos y relaciones estructurados, verificables y evaluables. No es un clasificador superficial de sentimiento. El LLM extrae y propone interpretaciones; no decide comprar o vender.

## 2. Pipeline propuesto
1. Recopilar noticias y acontecimientos de fuentes autorizadas.
2. Deduplicar artículos que describen el mismo acontecimiento.
3. Extraer hechos mediante LLM con JSON Schema estricto.
4. Resolver entidades: empresas, tickers, sectores, productos, países, clientes, proveedores y competidores.
5. Clasificar con taxonomía cerrada.
6. Identificar afectados directos e indirectos.
7. Evaluar novedad, relevancia, severidad potencial, horizonte y fiabilidad.
8. Contrastar con fuentes primarias y datos cuantitativos.
9. Entregar evidencia estructurada al motor de señales.
10. Evaluar después si la interpretación fue correcta y cómo reaccionó el mercado.

## 3. Taxonomía inicial
- Resultados empresariales y guidance.
- Regulación, sanciones y litigios.
- Cambios de dirección y CEO.
- Productos, tecnología, patentes y lanzamientos.
- Contratos, adjudicaciones, clientes y proveedores.
- Competencia y cuota de mercado.
- Financiación, deuda, ampliaciones, recompras y dividendos.
- Fusiones, adquisiciones y desinversiones.
- Incidentes operativos y ciberseguridad.
- Macroeconomía, tipos de interés y divisas.
- Geopolítica, aranceles y restricciones de exportación.
- Cambios de analistas, ratings y precios objetivo.

## 4. Separación obligatoria
A. Hecho confirmado: qué ocurrió, fuente y localización exacta de evidencia.
B. Interpretación: consecuencias posibles, explícitamente hipótesis.
C. Confianza: calidad calibrada de extracción, resolución de entidades e interpretación. No asignar probabilidades sin validación.
D. Impacto observado: reacción posterior del mercado, incorporada sólo cuando ocurre y nunca filtrada a la señal original.

## 5. Esquema conceptual (no definitivo)
```json
{
  "event_id": "stable-id",
  "event_type": "regulatory_restriction",
  "entities": [{"entity_id": "company-id", "role": "directly_affected"}],
  "sectors": [],
  "factual_summary": "...",
  "interpretation": {
    "impact_direction": "positive|negative|mixed|unknown",
    "impact_horizon": "short|medium|long|unknown",
    "rationale": "...",
    "confidence": 0.0
  },
  "novelty": "new|update|duplicate|unclear",
  "severity": "low|medium|high|unknown",
  "source_reliability": "primary|high|medium|low|unknown",
  "source_refs": [],
  "published_at": "...",
  "first_seen_at": "...",
  "event_occurred_at": null,
  "affected_relationships": [],
  "model": {"provider": "...", "name": "...", "version": "..."},
  "schema_version": "..."
}
```
El esquema final debe validar tipos, enums, timestamps, campos obligatorios y referencias a evidencia. Las salidas inválidas deben rechazarse o ponerse en cuarentena, no repararse silenciosamente.

## 6. Relaciones entre entidades
Modelar un grafo versionado de empresas, sectores, productos, proveedores, clientes y competidores. Cada arista necesita tipo, fuente, fecha de validez, confianza y contexto. Una relación comercial no implica automáticamente impacto positivo o negativo. Evaluar por separado efecto sobre ingresos, costes, sustitución, capacidad, competencia, restricciones y horizonte.

Ejemplo: una restricción de exportación de chips puede afectar de forma diferente a NVIDIA, AMD, TSMC y otros actores. Cada relación e impacto requiere evidencia y razonamiento específico.

## 7. Fiabilidad y evidencia
Prioridad a filings/reguladores, comunicados de empresa y bolsas; después fuentes periodísticas con reputación y corroboración independiente. Guardar URL, editor, timestamps de publicación/actualización/primera observación, fragmento permitido, tipo de fuente y evidencia concreta. No scrapear artículos protegidos ni asumir que una suscripción individual concede derechos de extracción automatizada o redistribución.

## 8. Evaluación del sistema de IA
Medir precisión de extracción, clasificación, resolución de entidades, deduplicación, dirección de impacto y calibración. Crear conjunto de referencia revisado manualmente; separar por evento, empresa, idioma y fuente. Registrar modelo, versión, prompt, schema y parámetros. Evaluar drift y errores sistemáticos. Debe existir abstención explícita.
