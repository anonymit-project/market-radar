# Validación de proveedores desde Windows

Esta prueba es un script aislado; no forma parte de la aplicación ni selecciona proveedor.

## Requisitos
- Windows 10/11.
- Node.js 18 o superior (recomendado Node.js 20 LTS).
- Cuenta gratuita creada por el titular en EODHD y, para el contraste USA, en Alpaca.
- No activar pruebas de pago ni introducir datos de pago.

## 1. Descargar el repositorio
Si ya tienes el repositorio en el ordenador, abre PowerShell dentro de su carpeta y ejecuta:

~~~powershell
git pull
~~~

Si aún no lo tienes:
1. Abre https://github.com/anonymit-project/market-radar
2. Pulsa **Code > Download ZIP**.
3. Descomprime el ZIP en una carpeta fácil de localizar.
4. Abre esa carpeta y, desde el Explorador, selecciona **Abrir en Terminal**.

## 2. Comprobar Node.js
En PowerShell:

~~~powershell
node --version
~~~

Debe mostrar v18 o superior. Si el comando no existe, instala Node.js LTS desde https://nodejs.org/ y vuelve a abrir PowerShell.

## 3. Preparar las claves localmente
1. En la carpeta principal del repositorio, copia el archivo **.env.local.example** y pega la copia con el nombre exacto **.env.local**.
2. Abre .env.local con el Bloc de notas.
3. Sustituye los marcadores por las claves obtenidas directamente de las cuentas gratuitas:

~~~text
EODHD_API_TOKEN=PEGA_AQUI_TU_TOKEN
ALPACA_API_KEY=PEGA_AQUI_TU_KEY
ALPACA_API_SECRET=PEGA_AQUI_TU_SECRET
~~~

4. Guarda el archivo. No lo adjuntes a GitHub, no lo envíes por email ni lo pegues en ChatGPT.

Puedes dejar las dos variables de Alpaca vacías si sólo quieres probar EODHD. El script también acepta variables de entorno definidas previamente en PowerShell; éstas tienen prioridad sobre el archivo local.

**Importante:** .env.local está excluido de Git mediante .gitignore. El script nunca imprime las claves ni las incluye en el informe.

## 4. Ejecutar la prueba
Desde PowerShell, en la carpeta principal del repositorio:

~~~powershell
node .\scripts\validate-providers.mjs
~~~

El script:
- Hace como máximo **12 peticiones EODHD** (una por cada activo del universo).
- Hace **una única petición agrupada a Alpaca** para NVDA, MSFT, META, AMZN, JNJ y SPY.
- Consulta sólo una ventana de siete días naturales y conserva como máximo tres barras recientes por símbolo.
- No reintenta peticiones automáticamente.
- No consulta ni descarga históricos masivos.
- No realiza operaciones de trading ni modifica cuentas.

Si falta una clave, ese proveedor aparece como omitido y no se realiza ninguna petición a ese proveedor.

## 5. Enviar el resultado
Al terminar aparecerá la ruta del informe, dentro de validation-results\, por ejemplo:

~~~text
validation-results\provider-validation-2026-11-24T12-00-00-000Z.json
~~~

1. Abre ese JSON con el Bloc de notas.
2. Comprueba que no contiene claves ni secretos (el script no debería incluirlos).
3. Adjunta **sólo el JSON de resultados**, nunca .env.local, a este chat.

El informe registra cobertura, símbolos aceptados/no encontrados, moneda, timestamps, OHLCV, errores HTTP resumidos, feed solicitado y consumo estimado. EODHD: el script estima una unidad por petición iniciada; contrasta esa cifra con el contador real de tu cuenta. Alpaca: registra una petición agrupada, no seis.

## Límites e interpretación
- Los identificadores europeos y cripto son candidatos documentales: la respuesta de la API determinará si son aceptados.
- Un símbolo aceptado sólo demuestra que la API devolvió barras; **no** valida licencia, calidad, ajustes, frescura ni idoneidad para producción.
- EODHD incluye adjustedClose cuando lo devuelve. Alpaca solicita adjustment=raw y feed=sip; comparar únicamente fechas comunes y no asumir que las series son equivalentes.
- El script no decide proveedor ni desarrolla Market Radar.
- La prueba puede consumir hasta 12 de las 20 llamadas EODHD diarias. No la ejecutes más de una vez el mismo día sin revisar antes el contador de cuota.
