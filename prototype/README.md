# Market Radar — prototipo visual

Prototipo estático e independiente. **No es la aplicación y no contiene funcionalidades financieras reales.** Todos los precios, indicadores, señales, noticias, alertas, cifras y fechas mostrados son ficticios.

## Abrir en escritorio

1. Descarga el repositorio (Code → Download ZIP) o clónalo.
2. Abre la carpeta `prototype/`.
3. Haz doble clic en `index.html`. Se abre en el navegador; no necesita instalación, dependencias, API ni servidor.

## Revisar el diseño móvil

- En Chrome o Edge de escritorio: abre `index.html`, pulsa F12 y activa el modo dispositivo (Ctrl+Shift+M). Prueba anchos de móvil y tablet.
- En un teléfono real, puedes servir temporalmente esta carpeta desde tu ordenador con cualquier servidor estático local y abrir desde el móvil la dirección local del ordenador. No requiere dejar un servidor encendido permanentemente. Ambos dispositivos deben estar en la misma red.

## Navegación incluida

- Visión general: indicadores de mercado, gráfico, radar destacado y novedades.
- Radar: tarjetas de oportunidad con score y niveles ilustrativos.
- Mi cartera: distribución y evolución de una cartera ficticia.
- Universo de activos: los 12 instrumentos de seguimiento y buscador.
- Ficha de activo: gráfico, indicadores, niveles, explicación y eventos.
- Noticias y alertas: separación visual entre hecho e interpretación y preferencias ilustrativas.

Los controles son únicamente demostrativos. Algunos cambian de vista, filtran o muestran mensajes; no guardan información ni llaman a servicios externos.

## Límites deliberados

- HTML, CSS y JavaScript estáticos; sin framework ni dependencias.
- No hay APIs, backend, base de datos, login, persistencia ni conexión con proveedores.
- No se implementa lógica de inversión, cálculo de señales ni actualización de precios.
- La cartera es una maqueta secundaria, no una función aprobada para desarrollo.
