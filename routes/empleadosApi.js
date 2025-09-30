import express from 'express';
import Empleado from '../models/Empleado.js';

const router = express.Router();

// GET todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET empleado por ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST crear empleado
router.post('/', async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json({ success: true, empleado });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT actualizar empleado
router.put('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!empleado) return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    res.json({ success: true, empleado });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE empleado
router.delete('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    res.json({ success: true, message: 'Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;