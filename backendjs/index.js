const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Connection/database');
const proyecto = require('./Models/proyectos');

app.use(express.json());
app.use(cors());


sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error sincronizando DB:', err));

// =======================
// RUTAS CRUD proyecto
// =======================

// Obtener todos los proyectos
app.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await proyecto.findAll();
        res.json(proyectos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});

// Crear un proyecto
app.post('/proyectos', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);

        // Solo tomar los campos necesarios
        const { nombre, estado, descripcion } = req.body;

        // Validación mínima
        if (nombre == null || estado == null || descripcion == null) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const proyecto = await proyecto.create({
            id,
            nombre,
            estado,
            descripcion,
            usuario_id
        });

        res.status(201).json(proyecto);
    } catch (err) {
        console.error('Error al crear proyecto:', err);

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Error de validación',
                detalles: err.errors.map(e => e.message)
            });
        }

        res.status(500).json({ error: err.message }); // Mostrar mensaje real
    }
});

// Obtener un proyecto por id
app.get('/proyecto/:id', async (req, res) => {
    try {
        const proyecto = await proyecto.findByPk(req.params.id);
        if (!proyecto) return res.status(404).json({ error: 'proyecto no encontrado' });
        res.json(proyecto);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar proyecto' });
    }
});

// Actualizar un trabajador
app.put('/proyecto/:id', async (req, res) => {
    try {
        const proyecto = await proyecto.findByPk(req.params.id);
        if (!proyecto) return res.status(404).json({ error: 'proyecto no encontrado' });
        await proyecto.update(req.body);
        res.json(proyecto);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar proyecto' });
    }
});

// Eliminar un trabajador
app.delete('/proyectos/:id', async (req, res) => {
    try {
        const proyecto = await proyecto.findByPk(req.params.id);
        if (!proyecto) return res.status(404).json({ error: 'proyecto no encontrado' });
        await proyecto.destroy();
        res.json({ message: 'proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar proyecto' });
    }
});

// =======================

app.listen(3000, () => {
    console.log('Server started on port 3000');
});