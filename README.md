# Proyecto: Pre-Entrega 2 - Backend

## Descripción

` Este proyecto tiene como objetivo configurar un servidor utilizando Express, Handlebars y Websockets para gestionar un inventario de productos en tiempo real. La aplicación permite visualizar, agregar y eliminar productos, actualizando automáticamente la vista en tiempo real mediante Websockets. `

## Estructura del Proyecto

```src
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜estilos.css
 ┃ ┣ 📂Imagen
 ┃ ┃ ┣ 📜GiordanoBruno_logo.ico
 ┃ ┗ 📂js
 ┃ ┃ ┗ 📜index.js
 ┣ 📂routes
 ┃ ┗ 📂api
 ┃ ┃ ┗ 📜view.routers.js
 ┣ 📂utils
 ┃ ┗ 📜persistenciaDatos.js
 ┣ 📂views
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜main.handlebars
 ┃ ┣ 📜home.handlebars
 ┃ ┗ 📜realTimeProducts.handlebars
 ┣ 📜app.js
 ┗ 📜utils.js 
 ```

# Tecnologías Utilizadas
### Node.js: Entorno de ejecución para el servidor.
### Express: Framework para aplicaciones web.
### Handlebars: Motor de plantillas para generar vistas dinámicas.
### Socket.io: Biblioteca para habilitar Websockets en el servidor y el cliente.


# Rutas y Funcionalidades
## Ruta principal (/): Renderiza la vista home.handlebars con la lista de productos (solo carga de producto de acuerdo a lo que se entendío en la consigna).
## Ruta de productos en tiempo real (/realtimeproducts): Renderiza la vista realTimeProducts.handlebars que se actualiza en tiempo real.
## API para agregar productos (/api/products): Permite agregar nuevos productos mediante una petición POST.
## API para eliminar productos (/api/products/:id): Permite eliminar productos mediante una petición DELETE.


# Vista home.handlebars

` Objetivo de La vista home.handlebars está diseñada para mostrar la lista de productos disponibles en el inventario de manera estática. Esto significa que al cargar la página, se renderiza una lista completa de productos obtenidos desde el servidor, pero no se actualiza automáticamente si hay cambios en los datos del servidor. `

` Uso: Se accede a esta vista desde la ruta principal del servidor (/). Esta vista es útil para ver el estado actual del inventario al momento de cargar la página. `


# Vista en Tiempo Real (realTimeProducts.handlebars)

` Objetivo: La vista realTimeProducts.handlebars está diseñada para mostrar la lista de productos disponibles en el inventario de manera dinámica, actualizándose en tiempo real a medida que se agregan o eliminan productos. Esto se logra mediante el uso de Websockets que permiten la comunicación bidireccional entre el servidor y el cliente, actualizando automáticamente la lista de productos sin necesidad de recargar la página. `

` Uso: Se accede a esta vista desde la ruta /realtimeproducts. Esta vista es útil para aplicaciones donde es crucial ver los cambios en el inventario en tiempo real, como en sistemas de gestión de almacenes o tiendas en línea que necesitan reflejar la disponibilidad de productos instantáneamente. `

![imagen vista en tiempo real](image.png)