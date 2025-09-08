const express =require('express') ;
const sequelize = require('./Connection/database');
const cors = require('cors');
const Trabajador = require('./Models/Trabajadores');
const Inventario = require('./Models/Inventarios');
const Proyecto = require('./Models/Proyectos');
const Usuario = require('./Models/Usuarios');

const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

// =======================
// RUTAS CRUD TRABAJADOR
// =======================

// Obtener todos los trabajadores
app.get('/trabajadores', async (req, res) => {
    try {
        const trabajadores = await Trabajador.findAll();
        res.status(200).json(trabajadores);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener trabajadores', error: err.message});
    }
});

// Crear un trabajador
app.post('/trabajadores', async (req, res) => {
  try {
    const trabajador = await Trabajador.create(req.body);
    res.status(201).json(trabajador);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear trabajador' });
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

// =======================
// RUTAS CRUD INVENTARIO
// =======================

// Obtener todos los elementos del inventario
app.get('/inventario', async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
});

// Crear un elemento de inventario
app.post('/inventario', async (req, res) => {
  try {
    const nuevoItem = await Inventario.create(req.body);
    res.status(201).json(nuevoItem);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear un elemento de inventario' });
  }
});

// Obtener un elemento de inventario por id
app.get('/inventario/:id', async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Elemento de inventario no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el elemento de inventario' });
  }
});

// Actualizar un elemento de inventario
app.put('/inventario/:id', async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Elemento de inventario no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el elemento de inventario' });
  }
});

// Eliminar un elemento de inventario
app.delete('/inventario/:id', async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Elemento de inventario no encontrado' });
    await item.destroy();
    res.json({ message: 'Elemento de inventario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el elemento de inventario' });
  }
});
// =======================

sequelize.sync({ force: false})
    .then(()=> {
        app.listen(3000,()=>{
        console.log('Server started on port 3000');
        })
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error)
    })





