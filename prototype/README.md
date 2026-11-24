# Market Radar — prototipo visual

Prototipo estático e independiente. **No es la aplicación y no contiene funcionalidades financieras reales.** Todos los precios, indicadores, señales, noticias, alertas, cifras y fechas mostrados son ficticios.

## Abrir en escritorio

1. Descarga el repositorio (Code → Download ZIP) o clónalo.
2. Abre la carpeta `prototype/`.
3. Haz doble clic en `index.html`. Se abre en el navegador; no necesita instalación, dependencias, API ni servidor.

## Revisar el diseño móvil

- En Chrome o Edge de escritorio: abre `index.html`, pulsa F12 y activa el modo dispositivo (Ctrl+Shift+M). Prueba anchos de móvil y tablet.
- En un teléfono real, puedes servir temporalmente esta carpeta desde tu ordenador con cualquier servidor estático local y abrir desde el móvil la dirección local del ordenador. No requiere dejar un servidor encendido permanentemente. Ambos dispositivos deben estar en la misma red.

Para verlo en un teléfono real desde Windows, si tienes Python instalado, abre PowerShell en la carpeta raíz del repositorio y ejecuta:\n\n\`\`\`powershell\npy -m http.server 8000 --directory prototype\n\`\`\`\n\nCon el ordenador y el móvil conectados a la misma Wi-Fi, consulta la dirección IPv4 del ordenador con \`ipconfig\` y abre \`http://IP-DEL-ORDENADOR:8000\` en el móvil. Al terminar, detén el servidor con Ctrl+C. Es un servidor temporal de archivos estáticos, no queda ejecutándose en segundo plano. Si Windows solicita permiso de red, permite el acceso sólo en redes privadas.\n\n## Navegación incluida

- Radar: tarjetas de oportunidad con score y niveles ilustrativos.
- Histórico de señales: registro de alertas, entregas simuladas por Telegram y resultados a 1/5/10/30/90 días frente a benchmark.
- Universo de activos: los 12 instrumentos de seguimiento y buscador.
- Ficha de activo: gráfico, indicadores, niveles, explicación y eventos.
- Noticias y alertas: separación visual entre hecho e interpretación y preferencias ilustrativas.

Los controles son únicamente demostrativos. Algunos cambian de vista, filtran o muestran mensajes; no guardan información ni llaman a servicios externos.

## Límites deliberados

- HTML, CSS y JavaScript estáticos; sin framework ni dependencias.
- No hay APIs, backend, base de datos, login, persistencia ni conexión con proveedores.
- No se implementa lógica de inversión, cálculo de señales ni actualización de precios.
- No se incluye gestor de cartera: el foco del producto es el radar y la evaluación objetiva de sus señales. El histórico es también una maqueta con resultados ficticios, no un backtest real.
