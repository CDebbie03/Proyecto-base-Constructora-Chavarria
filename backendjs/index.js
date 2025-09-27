const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Connection/database');

const Trabajador  = require('./Models/Trabajador');
const Proyecto = require('./Models/proyectos'); 

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
sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error sincronizando DB:', err));

// =======================
// RUTAS CRUD Proyecto
// =======================

// Obtener todos los proyectos
app.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});

// Crear un proyecto
app.post('/proyectos', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);

        const { id, nombre, estado, descripcion, usuario_id } = req.body;

        if (!nombre || !estado || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const nuevoProyecto = await Proyecto.create({
            id,
            nombre,
            estado,
            descripcion,
            usuario_id
        });

        res.status(201).json({
            message: 'Proyecto creado exitosamente',
            data: nuevoProyecto
        });
    } catch (err) {
        console.error('Error al crear proyecto:', err);

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Error de validación',
                detalles: err.errors.map(e => e.message)
            });
        }

        res.status(500).json({ error: err.message });
    }
});

// Obtener un proyecto por id
app.get('/proyectos/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json(proyecto);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar proyecto' });
    }
});

// Actualizar un proyecto
app.put('/proyectos/:id', async (req, res) => {
    try {
        const proyectoEncontrado = await Proyecto.findByPk(req.params.id);
        if (!proyectoEncontrado) return res.status(404).json({ error: 'Proyecto no encontrado' });

        await proyectoEncontrado.update(req.body);
        res.json({
            message: 'Proyecto actualizado exitosamente',
            data: proyectoEncontrado
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar proyecto' });
    }
});

// Eliminar un proyecto
app.delete('/proyectos/:id', async (req, res) => {
    try {
        const proyectoEncontrado = await Proyecto.findByPk(req.params.id);
        if (!proyectoEncontrado) return res.status(404).json({ error: 'Proyecto no encontrado' });

        await proyectoEncontrado.destroy();
        res.json({ message: 'Proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar proyecto' });
    }
});

// =======================

app.listen(3000, () => {

  console.log('Server started on port 3000');

    console.log('Server started on port 3000');
})
});
