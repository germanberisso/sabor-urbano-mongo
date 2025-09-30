# sabor-urbano-mongo
Plan de Migración a MongoDB
1️⃣ Preparar el proyecto

Crear carpeta nueva: sabor-urbano-mongo.

Inicializar proyecto Node.js:

mkdir sabor-urbano-mongo
cd sabor-urbano-mongo
npm init -y


Instalar dependencias:

npm install express pug mongoose method-override dotenv
npm install --save-dev nodemon


Crear estructura de carpetas similar al anterior:

📁 sabor-urbano-mongo/
├── controllers/
├── models/
├── routes/
├── views/
├── middleware/
├── scripts/
├── .env
├── app.js
└── package.json

2️⃣ Configuración de MongoDB

Crear archivo .env con:

PORT=3000
MONGO_URI=mongodb://localhost:27017/sabor-urbano


En app.js, conectar con Mongoose:

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.listen(process.env.PORT, () => console.log(`Servidor en puerto ${process.env.PORT}`));

3️⃣ Crear modelos con Mongoose

Ejemplo models/Cliente.js:

import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String
}, { timestamps: true });

export default mongoose.model('Cliente', clienteSchema);


Hacer lo mismo con Empleado, Pedido, Insumo, Tarea.

Definir relaciones usando ref para campos relacionados:

empleadoAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' }
pedidoAsociado: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }
clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }

4️⃣ Controladores

Mantener lógica similar al proyecto anterior, solo cambiando el CRUD para usar Mongoose:

// Ejemplo: obtener todos los clientes
import Cliente from '../models/Cliente.js';

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

5️⃣ Rutas

Mantener las mismas rutas que antes (/api/clientes, /clientes/nuevo, /clientes/editar/:id) pero usando los controladores con Mongoose.

Para las vistas Pug, los formularios y tablas casi no cambian.

6️⃣ Scripts de normalización

Cambiar scripts/normalizar_datos_v1.js para que lea los JSON y los inserte en MongoDB usando los modelos correspondientes.

Opcional: dejar script para backup/restauración de MongoDB.

7️⃣ README nuevo

Mantener el contenido anterior.

Agregar sección Cambios para MongoDB:

Base de datos: ahora MongoDB en lugar de JSON.

Relaciones: campos ObjectId y ref.

CRUD con Mongoose.

.env para configuración.
