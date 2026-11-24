# Prototipo visual independiente — 24-11-2026

## Objetivo

Validar jerarquía de información, navegación y diseño responsive de Market Radar antes de desarrollar la aplicación definitiva. Este prototipo es una maqueta estática, aislada en `prototype/`; no altera la arquitectura ni adelanta la selección de proveedores.

## Alcance

- Radar de oportunidades y tarjetas de señales.
- Universo inicial de 12 activos y fichas individuales.
- Gráficos e indicadores ilustrativos.
- Histórico de señales con entregas de Telegram y evaluación ilustrativa a 1/5/10/30/90 días.
- Noticias, eventos y alertas ficticios.
- Navegación visual y diseño responsive para escritorio, tablet y móvil.

## Restricciones

- Todos los datos son inventados; no se consultan ni representan cotizaciones reales.
- Sin APIs, backend, base de datos, autenticación, proveedor de datos, IA ni persistencia.
- No se implementa lógica de señales, backtesting, órdenes ni gestión de cartera.
- El histórico sólo ilustra cómo auditar señales y medir resultados; sus cifras son inventadas y no validan el rendimiento del sistema.
- No modificar las decisiones ni especificaciones de producto por lo que aparezca en la maqueta.
- La cartera se muestra sólo como elemento visual secundario, conforme a la especificación vigente.

## Tecnología y ejecución

HTML, CSS y JavaScript nativos, sin dependencias. Abrir `prototype/index.html` directamente en un navegador. Instrucciones adicionales en `prototype/README.md`.

## Estado

Prototipo inicial publicado para revisión visual. No equivale a una aplicación funcional ni cambia la fase del proyecto: la validación de fuentes y proveedores sigue pendiente.

## Próximo paso

Recoger feedback visual del titular, priorizar cambios de interfaz y actualizar exclusivamente los archivos de `prototype/` salvo que el titular apruebe expresamente un cambio de producto o arquitectura.


## Revisión visual — 24-11-2026

- Se elimina «Visión general» y el dashboard abre directamente en «Radar de oportunidades».
- Se retira «Mi cartera» del prototipo para mantener el foco en la detección de oportunidades; no se cambia el alcance funcional documentado del producto, donde la cartera virtual ya era secundaria y opcional.
- Se añade «Histórico de señales» como sección visual para validar el comportamiento del radar: registro de emisión, niveles originales, estado, entrega Telegram y ventanas de evaluación a 1, 5, 10, 30 y 90 días frente a benchmark.
- Todas las cifras del histórico son ficticias. No hay ledger, cálculo de rentabilidad ni integración Telegram reales.
- Se mantiene universo de activos, fichas, noticias y alertas.
