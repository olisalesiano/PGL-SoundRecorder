# PGL-SoundRecorder

Una grabadora de audio sencilla hecha con React Native y Expo. La aplicación permite grabar audios, ponerles un nombre, reproducirlos y gestionarlos desde una lista. Todo el audio se guarda en el dispositivo y se recupera automáticamente al volver a abrir la app.

## Qué hace la aplicación

- Graba audio usando el micrófono del dispositivo.
- Muestra una animación con barras que se mueven mientras se está grabando.
- Al terminar una grabación, pregunta si quieres ponerle un nombre.
- Lista todas las grabaciones guardadas con su fecha, duración y nombre.
- Cada grabación se puede reproducir con un botón de play/pause y tiene una barra de progreso para adelantar o retroceder.
- Eliminar grabaciones individuales deslizando hacia la izquierda.
- Modo de selección múltiple para borrar varios audios a la vez.
- Opción de borrar todas las grabaciones desde el menú.
- Persistencia de datos: los audios se mantienen aunque cierres la aplicación.

## Cómo está hecha

El proyecto está desarrollado con Expo y utiliza la librería `expo-audio` para todo lo relacionado con grabación y reproducción. El almacenamiento de las referencias a los archivos se hace con `AsyncStorage`.

La interfaz está dividida en tres componentes principales que se comunican entre sí:

- **Record.tsx**: El pie de pantalla con el botón de grabar y la animación de ondas.
- **RecordList.tsx**: La lista de grabaciones, cada una con su reproductor y opciones de eliminación.
- **HeaderChat.tsx**: La barra superior con el título, el menú de opciones y el modo selección.

Para las animaciones se ha usado el propio sistema de estados de React con intervalos para crear el efecto de ecualizador, y gestos nativos para el swipe.

## Requisitos de la práctica

La práctica pedía implementar una serie de puntos. Cada uno está documentado por separado en los siguientes apartados:

- [1. Diseño de la pantalla de grabación](docs/01-diseno-pantalla.md)
- [2. Permisos de grabación](docs/02-permisos.md)
- [3. Persistencia de datos](docs/03-persistencia.md)
- [4. Componente de carga](docs/04-componente-carga.md)
- [5. Animaciones propias](docs/05-animaciones.md)

## Cómo probar la aplicación

1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Ejecuta `npx expo start`
4. Escanea el QR con Expo Go en tu dispositivo

> Es necesario un dispositivo físico para probar la grabación de audio, ya que el emulador no tiene micrófono funcional.
