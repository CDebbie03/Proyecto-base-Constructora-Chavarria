const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Connection/database');
const Proyecto = require('./Models/proyectos'); 

app.use(express.json());
app.use(cors());

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
});
