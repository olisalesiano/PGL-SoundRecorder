# 2. Permisos de grabación

La aplicación solicita permiso para acceder al micrófono justo cuando se va a grabar por primera vez.

## Implementación

En el componente `Record.tsx`, dentro del `useEffect` que se ejecuta al montar el componente, se llama a:

```javascript
AudioModule.requestRecordingPermissionsAsync();
```

Esta función muestra el diálogo nativo del sistema operativo pidiendo acceso al micrófono. Si el usuario ya concedió el permiso anteriormente, no vuelve a preguntar.

https://../images/permiso-microfono.png

Además, antes de iniciar la grabación se configura el modo de audio con:

```javascript
await AudioModule.setAudioModeAsync({
  allowsRecording: true,
  playsInSilentMode: true,
  shouldRouteThroughEarpiece: false,
});
```

Esto prepara el sistema para grabar correctamente y asegura que el audio se reproduzca por el altavoz y no por el auricular.

---
