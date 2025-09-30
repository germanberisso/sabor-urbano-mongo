import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error en la conexión a MongoDB:', err));

// Redirigir página principal a empleados
app.get('/', (req, res) => {
  res.redirect('/empleados');
});

// Routers
import empleadosRouter from './routes/empleados.js';
import empleadosApiRouter from './routes/empleadosApi.js';

// Vistas
app.use('/empleados', empleadosRouter);

// API
app.use('/api/empleados', empleadosApiRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});