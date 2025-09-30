Sabor Urbano - Sistema de Gestión Backend (MongoDB)

Sistema de gestión integral para el restaurante "Sabor Urbano", desarrollado con Node.js, Express y MongoDB usando Mongoose. Incluye una API REST completa para operaciones CRUD, interfaces web responsivas con Pug y filtros avanzados para tareas. Mantiene la unificación de pedidos (presenciales y delivery) y el control de inventario, ahora con relaciones explícitas entre modelos en MongoDB: Cliente-Pedido, Tarea-Pedido y Tarea-Empleado.

Tabla de Contenidos

Características

Arquitectura

Instalación

Uso

API Endpoints

Interfaces Web

Testing

Estructura del Proyecto

Normalización de Datos

Tecnologías

Cambios con MongoDB

Contribución

Licencia

Responsabilidades del Equipo

Bibliografía

Características
Funcionalidades Principales

Gestión de Tareas: Control de actividades por áreas con estados (pendiente, en proceso, finalizada), prioridades (alta, media, baja), asignación a empleados y asociación opcional con pedidos.

Gestión de Empleados: Registro, edición y eliminación con roles y áreas.

Gestión de Clientes: Registro con validación de email único y búsqueda por nombre/apellido.

Gestión de Pedidos: Unifica pedidos presenciales y delivery (Rappi, PedidosYa, propia, local). Parseo de ítems desde texto y cálculo proporcional de precios.

Control de Inventario: Manejo de insumos por categorías, con alertas de stock bajo/sin stock.

Filtros de Tareas: Combina estado, prioridad, fechas, empleado asignado, tipo de pedido y plataforma.

Relaciones entre Modelos:

Cliente-Pedido: Cada pedido está vinculado a un cliente mediante clienteId (ObjectId).

Tarea-Pedido: Tareas de gestión de pedidos pueden asociarse a un pedido vía pedidoAsociado (ObjectId).

Tarea-Empleado: Tareas pueden asignarse a un empleado vía empleadoAsignado (ObjectId).

Características Técnicas

API REST con CRUD y filtros avanzados usando Mongoose.

Modelos POO para entidades con esquemas Mongoose.

Middleware personalizado para validaciones.

Vistas Pug con formularios y tablas responsivas.

Base de datos MongoDB con relaciones y referencias (ref).

Script de normalización para migración desde JSON a MongoDB.

Arquitectura
📁 sabor-urbano-mongo/
├── controllers/
│   ├── clientesController.js
│   ├── empleadosController.js
│   ├── insumosController.js
│   ├── pedidosController.js
│   └── tareasController.js
├── models/
│   ├── Cliente.js
│   ├── Empleado.js
│   ├── Insumo.js
│   ├── Pedido.js
│   └── Tarea.js
├── routes/
│   ├── clientes.js
│   ├── empleados.js
│   ├── insumos.js
│   ├── pedidos.js
│   └── tareas.js
├── views/
│   ├── layout.pug
│   ├── error.pug
│   ├── filters.pug
│   ├── empleados/
│   ├── insumos/
│   ├── pedidos/
│   └── tareas/
├── middleware/
│   └── validation.js
├── scripts/
│   └── normalizar_datos_mongo.js
├── .env
├── package.json
└── app.js

Instalación
Prerrequisitos

Node.js v18+

npm v8+

MongoDB 6+ en local o en Atlas

Editor de código (VS Code recomendado)

Instalación Paso a Paso

Clonar repositorio:

git clone https://github.com/tu-usuario/sabor-urbano-mongo.git
cd sabor-urbano-mongo


Instalar dependencias:

npm install


Configurar .env:

PORT=3000
MONGO_URI=mongodb://localhost:27017/sabor-urbano


Iniciar servidor:

npm run dev  # para desarrollo
npm start    # para producción

Uso
Interfaces Web
URL	Descripción
/	Redirige a tareas
/tareas	Lista, crear, editar tareas
/empleados	Gestión de empleados
/pedidos	Gestión de pedidos
/insumos	Control de inventario
/filtros	Filtros avanzados para tareas
API

Base URL: /api

Formato: JSON

Métodos: GET, POST, PUT, DELETE, PATCH

API Endpoints

Se mantiene la misma estructura del proyecto anterior, pero ahora con MongoDB y ObjectId.

Ejemplo Clientes:

Método	Endpoint	Descripción
GET	/api/clientes	Todos los clientes
POST	/api/clientes	Crear cliente
PUT	/api/clientes/:id	Actualizar cliente
DELETE	/api/clientes/:id	Eliminar cliente

Nota: Los IDs ahora son ObjectId de MongoDB.

Interfaces Web

Sin cambios significativos respecto a Pug/Bootstrap.

Formularios y tablas funcionan igual, solo que se consumen datos de MongoDB.

Testing

Prueba con Thunder Client/Postman. Ejemplos:

POST http://localhost:3000/api/pedidos
Content-Type: application/json

{
  "clienteId": "64f3d2e1a1b2c3d4e5f67890",
  "itemsText": "2 hamburguesas, 1 gaseosa",
  "total": 5000,
  "tipo": "delivery",
  "plataforma": "rappi"
}

POST http://localhost:3000/api/tareas
Content-Type: application/json

{
  "titulo": "Confirmar RAPPI-456",
  "area": "gestion_pedidos",
  "prioridad": "alta",
  "empleadoAsignado": "64f3d2e1a1b2c3d4e5f67891",
  "pedidoAsociado": "64f3d2e1a1b2c3d4e5f67892"
}

Normalización de Datos

scripts/normalizar_datos_mongo.js convierte los JSON del proyecto anterior a MongoDB.

Valida referencias y crea registros iniciales en MongoDB.

npm run normalizar

Tecnologías

Backend: Node.js v18+, Express 4.18.2, Mongoose 7

Base de Datos: MongoDB 6+

Vistas: Pug 3.0.2, Bootstrap 5.1.3

Desarrollo: Nodemon, Thunder Client

Cambios con MongoDB

JSON reemplazado por MongoDB.

Relaciones con ObjectId y ref en Mongoose.

CRUD con Mongoose (find, findById, save, findByIdAndUpdate, findByIdAndDelete).

Script de normalización adaptado a Mongo.

.env para configuración de conexión.

Contribución

Fork → branch → commit → PR.

Mantener estándares de ESLint y nombres descriptivos.

Usar .env para configuración local.

Responsabilidades del Equipo

Igual que proyecto anterior, ahora el Database Manager administra MongoDB y scripts de migración.

Bibliografía

Documentación Oficial Node.js: https://nodejs.org/docs

Express.js Guide: https://expressjs.com/

Mongoose Docs: https://mongoosejs.com/docs/

Pug Template Engine: https://pugjs.org/

Bootstrap Documentation: https://getbootstrap.com/docs/5.1/
