import express from 'express';
import Empleado from '../models/Empleado.js';

const router = express.Router();

// Lista de empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.render('empleados/index', { empleados });
  } catch (err) {
    res.render('error', { error: err.message, code: 500 });
  }
});

// Formulario para nuevo empleado
router.get('/nuevo', (req, res) => {
  res.render('empleados/formEmpleado', { empleado: null });
});

// Crear nuevo empleado
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, puesto, rol, area, salario, fechaIngreso } = req.body;

    // Validar campos obligatorios
    if (!apellido || !email || !rol || !area) {
      return res.render('error', { error: 'Faltan campos obligatorios', code: 400 });
    }

    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      email,
      telefono,
      puesto,
      rol,
      area,
      salario,
      fechaIngreso: fechaIngreso ? new Date(fechaIngreso) : null
    });

    await nuevoEmpleado.save();
    res.redirect('/empleados');
  } catch (err) {
    res.render('error', { error: err.message, code: 500 });
  }
});

// Formulario para editar empleado
router.get('/editar/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.render('error', { error: 'Empleado no encontrado', code: 404 });

    // Formatear fecha para input type="date"
    const empleadoData = empleado.toObject();
    empleadoData.fechaIngresoFormatted = empleado.fechaIngreso
      ? empleado.fechaIngreso.toISOString().split('T')[0]
      : '';

    res.render('empleados/formEmpleado', { empleado: empleadoData });
  } catch (err) {
    res.render('error', { error: err.message, code: 500 });
  }
});

// Actualizar empleado
router.put('/:id', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, puesto, rol, area, salario, fechaIngreso } = req.body;

    if (!apellido || !email || !rol || !area) {
      return res.render('error', { error: 'Faltan campos obligatorios', code: 400 });
    }

    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        email,
        telefono,
        puesto,
        rol,
        area,
        salario,
        fechaIngreso: fechaIngreso ? new Date(fechaIngreso) : null
      },
      { new: true, runValidators: true }
    );

    if (!empleado) return res.render('error', { error: 'Empleado no encontrado', code: 404 });

    res.redirect('/empleados');
  } catch (err) {
    res.render('error', { error: err.message, code: 500 });
  }
});

// Ver detalle de un empleado en JSON
router.get('/ver/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;