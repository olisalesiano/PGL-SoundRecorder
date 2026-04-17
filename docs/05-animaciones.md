# 5. Animaciones propias

La aplicación incluye varias animaciones, algunas funcionales y otras puramente visuales.

## Animación durante la grabación (ecualizador)

Es la animación principal de la pantalla. Mientras se está grabando, aparece una fila de 32 barras verticales cuyas alturas cambian aleatoriamente cada 100 milisegundos.

![Grabación activa](../images/grabacion-activa.png)

Esto se consigue con un `setInterval` que actualiza un array de alturas en el estado del componente:

```javascript
const interval = setInterval(() => {
  setAlturas(Array.from({ length: NUM_BARRAS }, () => Math.random() * 52 + 6));
}, 100);
```

Cada barra es un View con altura variable, lo que crea el efecto visual de un ecualizador reaccionando al sonido.

Animación del swipe para eliminar
Se usa ReanimatedSwipeable de la librería react-native-gesture-handler. Al deslizar un elemento hacia la izquierda, aparece suavemente un botón rojo de eliminar. El gesto responde al movimiento del dedo de forma fluida gracias al motor de animaciones nativo.

Transiciones en el modo selección
Al entrar y salir del modo selección, la cabecera cambia su contenido. Aunque el cambio es inmediato (no tiene una transición animada como tal), el contraste entre el estado normal y el de selección hace que el usuario perciba claramente que ha cambiado de modo.

Feedback visual en botones
Los botones de play/pause y los elementos del menú tienen un cambio de opacidad al ser presionados, lo que da una respuesta táctil inmediata sin necesidad de animaciones complejas.
