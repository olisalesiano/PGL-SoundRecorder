# 1. Diseño de la pantalla de grabación

La pantalla principal contiene todos los elementos que se pedían en el enunciado.

## Elementos implementados

### Botón para grabar y parar grabación

Está situado en la parte inferior de la pantalla. Muestra el texto "Iniciar grabación" o "Detener" según el estado actual, acompañado de un icono de micrófono o de stop.

![Pantalla principal](../images/pantalla-principal.png)

### Indicador de grabación en curso

Mientras se graba, aparece una fila de barras verticales que cambian de altura aleatoriamente, simulando un ecualizador de audio. Esto da feedback visual inmediato de que la grabación está activa.

![Grabación activa](../images/grabacion-activa.png)

### Listado de audios grabados

La zona central muestra una lista desplazable con todas las grabaciones. Cada elemento incluye el nombre, la fecha y la duración del audio.

### Reproductor individual

Dentro de cada elemento de la lista hay un botón de play/pause. También se muestra una barra de progreso que permite mover el punto de reproducción arrastrando el dedo, y encima aparecen los tiempos actual y total del audio.

### Eliminar audios

Se puede eliminar de dos formas:

- **Individual**: Deslizando el elemento hacia la izquierda y pulsando "Eliminar".
- **Múltiple**: Entrando en el modo selección desde el menú de la esquina superior derecha.

![Swipe para eliminar](../images/swipe-eliminar.png)
![Modo selección](../images/modo-seleccion.png)

### Eliminar todos los audios

En el menú superior (tres puntos) está la opción "Borrar todo". Al pulsarla aparece un diálogo de confirmación para evitar borrados accidentales.

![Menú de opciones](../images/menu-opciones.png)

### Nombre para las grabaciones

Cuando se detiene una grabación, se abre un modal preguntando si se quiere poner un nombre. Si se deja vacío, se usará un nombre genérico.

![Modal nombre](../images/modal-nombre.png)
