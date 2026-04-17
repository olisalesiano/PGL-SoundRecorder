# 3. Persistencia de datos

Los audios grabados se guardan en el dispositivo y se recuperan al abrir la aplicación de nuevo.

## Cómo funciona

Las grabaciones se almacenan como archivos físicos en el sistema de archivos del dispositivo. La ruta de cada archivo (URI) es lo que se guarda en `AsyncStorage`, que es un sistema de almacenamiento persistente tipo clave-valor.

Cada grabación se representa con un objeto que contiene:

- `id`: identificador único
- `title`: nombre que le puso el usuario
- `date`: fecha y hora de la grabación
- `duration`: duración en formato legible
- `uri`: ruta al archivo de audio

Cuando se inicia la aplicación, el `useEffect` del componente principal carga todas las grabaciones guardadas desde AsyncStorage y las muestra en la lista.

Cuando se graba un nuevo audio o se elimina uno, se actualiza tanto la lista en memoria como lo guardado en AsyncStorage, manteniendo siempre la coherencia.

Esta aproximación tiene una limitación mencionada en los consejos del enunciado: si el usuario limpia la caché de la aplicación, se perderán las referencias y los audios dejarán de aparecer aunque los archivos sigan existiendo.
