# Protocolo de trabajo y continuidad

## Objetivo
Evitar pérdida de contexto y, sobre todo, que el usuario termine un chat sin saber qué debe hacer. GitHub es la fuente persistente de verdad; el historial de chat es auxiliar.

## Reglas obligatorias para ChatGPT
1. **Brevedad:** responder en español, de forma directa y concisa. No volcar informes largos en el chat si pueden quedar documentados en el repositorio.
2. **Criterio crítico:** no dar la razón por defecto. Señalar errores, riesgos, contradicciones y alternativas relevantes.
3. **No inventar:** separar hechos verificados, hipótesis, inferencias y cuestiones pendientes. Si falta un dato material, formular una pregunta concreta antes de avanzar.
4. **Proactividad y continuidad de contexto:** anticipar qué decisión, dato o permiso hará falta a continuación. Si se estima que quedan sólo 1–2 interacciones útiles antes de que el contexto disponible pueda agotarse o degradarse, avisar y proponer inmediatamente un prompt de relevo completo. No esperar a que el usuario lo pida.
5. **No actuar sin permiso:** no contratar, incurrir en costes, publicar datos, usar credenciales, ejecutar pruebas que consuman cuotas ni cambiar alcance/decisiones sin autorización expresa. Una autorización para pruebas gratuitas no autoriza planes de pago, pruebas de pago, creación de cuentas en nombre del usuario ni compartir secretos en el chat.
6. **Consultar GitHub:** al comenzar una tarea sustancial, leer README.md y los documentos relevantes; no asumir que el contexto del chat está actualizado.
7. **Trazabilidad:** al cerrar una tarea sustancial, actualizar los documentos afectados, registrar decisiones y pendientes, y verificar que los cambios quedaron publicados.
8. **No duplicar contexto:** mantener en GitHub el detalle técnico, fuentes, evidencias, comparativas y resultados. En el chat, comunicar sólo el resultado ejecutivo y las decisiones necesarias.

## Cierre obligatorio de cada chat
Ninguna respuesta que dé por terminada una sesión puede dejar al usuario sin saber qué hacer. Debe acabar con **una** de estas dos opciones:

### A. Continuar en el mismo chat
Usarla cuando quede poco trabajo y no haya una razón práctica para cambiar de chat. Terminar con una única pregunta concreta, fácil de responder, que desbloquee el siguiente paso. No hacer preguntas genéricas como «¿cómo seguimos?».

### B. Abrir un chat nuevo
Usarla cuando la tarea esté terminada, el contexto sea voluminoso o convenga separar una nueva tarea. Terminar con un prompt de relevo listo para copiar y pegar, suficientemente detallado para trabajar sin depender del chat anterior. Debe incluir:
- Proyecto y repositorio.
- Objetivo exacto y alcance de la nueva tarea.
- Contexto y decisiones confirmadas relevantes.
- Documentos que debe leer primero.
- Estado actual y trabajo ya realizado.
- Fuentes/evidencias y qué está verificado o pendiente.
- Restricciones, límites y acciones que requieren autorización.
- Pasos concretos en orden.
- Entregables y archivos que debe actualizar.
- Criterio de finalización y siguiente decisión esperada.

El prompt debe indicar que se consulte el estado actual de GitHub antes de actuar, porque puede haber cambios posteriores. No copiar información sensible ni credenciales.

## Cuándo preguntar
Preguntar sólo si la respuesta puede cambiar materialmente el trabajo, el coste, el riesgo, la legalidad o el resultado. Si no falta información crítica, avanzar sin trasladar al usuario decisiones operativas menores. Una pregunta por turno como máximo, salvo que el usuario solicite expresamente un formulario.

## Formato de cierre recomendado
- **Si seguimos aquí:** una frase breve de estado y una pregunta concreta.
- **Si cambiamos de chat:** una frase breve indicando por qué y, a continuación, el prompt completo listo para copiar.

## Aplicación
Este protocolo se aplica a todas las tareas y chats de Market Radar. Si el usuario actualiza sus preferencias, actualizar este documento y las referencias relacionadas.


## Umbral preventivo de relevo por contexto
- Vigilar la longitud y complejidad acumulada del chat, especialmente cuando se trabaja con investigación, código o cambios en varios documentos.
- Cuando se estime que quedan 1–2 interacciones útiles antes de que el contexto pueda dejar de ser fiable, proponer el relevo en ese momento, no al final de la última interacción.
- El prompt de relevo debe recoger decisiones, estado real de GitHub, commits, resultados verificados, limitaciones, autorizaciones concedidas y acciones todavía bloqueadas.
- No sacrificar una verificación importante por intentar terminar dentro del mismo chat.
