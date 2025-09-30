import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  rol: { 
    type: String, 
    enum: ['administrador', 'cocinero', 'repartidor', 'mozo', 'encargado_stock'], 
    required: true 
  },
  area: { 
    type: String, 
    enum: ['cocina', 'reparto', 'salon', 'inventario', 'administracion'], 
    required: true 
  },
  fechaIngreso: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Empleado', empleadoSchema);
