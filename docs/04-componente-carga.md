# 4. Componente de carga

## Lo que pide el enunciado

El enunciado pedía crear un componente propio para mostrar durante procesos de carga e implementarlo en dos sitios: al cargar las grabaciones iniciales y durante el proceso de grabación.

## Lo que se ha hecho diferente

En esta aplicación no se implementó un componente de carga independiente. En su lugar se optó por otros indicadores visuales:

- **Carga inicial**: La lista aparece vacía mientras se recuperan los datos de AsyncStorage, lo cual es prácticamente instantáneo porque solo se leen unas pocas referencias de texto. No hay un tiempo de espera apreciable que justifique un spinner.

- **Proceso de grabación**: El feedback visual lo proporcionan la animación de barras del ecualizador y el cambio de texto e icono en el botón. El usuario ve claramente que está grabando.

No se consideró necesario añadir un componente de carga adicional porque la aplicación es muy ligera y las operaciones asíncronas se resuelven en milisegundos.
