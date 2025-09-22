const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Connection/database');
const Trabajador  = require('./Models/Trabajador');

app.use(express.json());
app.use(cors());


sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error sincronizando DB:', err));

// =======================
// RUTAS CRUD TRABAJADOR
// =======================

// Obtener todos los trabajadores
app.get('/trabajadores', async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.json(trabajadores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener trabajadores' });
  }
});

// Crear un trabajador
app.post('/trabajadores', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);

    // Solo tomar los campos necesarios
    const { nombre, horas_trabajadas, comentario, proyecto_id } = req.body;

    // Validación mínima
    if (!nombre || horas_trabajadas == null || !comentario || proyecto_id == null) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const trabajador = await Trabajador.create({
      nombre,
      horas_trabajadas,
      comentario,
      proyecto_id
    });

    res.status(201).json(trabajador);
  } catch (err) {
    console.error('Error al crear trabajador:', err);

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Error de validación',
        detalles: err.errors.map(e => e.message)
      });
    }

    res.status(500).json({ error: err.message }); // Mostrar mensaje real
  }
});

// Obtener un trabajador por id
app.get('/trabajadores/:id', async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json(trabajador);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar trabajador' });
  }
});

// Actualizar un trabajador
app.put('/trabajadores/:id', async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    await trabajador.update(req.body);
    res.json(trabajador);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar trabajador' });
  }
});

// Eliminar un trabajador
app.delete('/trabajadores/:id', async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    await trabajador.destroy();
    res.json({ message: 'Trabajador eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar trabajador' });
  }
});

// =======================

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
