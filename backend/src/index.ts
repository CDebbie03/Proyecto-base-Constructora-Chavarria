import express, { Request, Response } from 'express';
import sequelize from '../Connection/database';
import cors from 'cors';
import { Trabajador } from '../Models/Trabajadores';
const app=express();
app.use(express.json());
app.use(cors(
  {
  origin: 'http://localhost:4200'
}));

sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error sincronizando DB:', err));

// =======================
// RUTAS CRUD TRABAJADOR
// =======================

// Obtener todos los trabajadores
app.get('/trabajadores', async (req: Request, res: Response) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.json(trabajadores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener trabajadores' });
  }
});

// Crear un trabajador
app.post('/trabajadores', async (req: Request, res: Response) => {
  try {
    const trabajador = await Trabajador.create(req.body);
    res.status(201).json(trabajador);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear trabajador' });
  }
});

// Obtener un trabajador por id
app.get('/trabajadores/:id', async (req: Request, res: Response) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json(trabajador);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar trabajador' });
  }
});

// Actualizar un trabajador
app.put('/trabajadores/:id', async (req: Request, res: Response) => {
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
app.delete('/trabajadores/:id', async (req: Request, res: Response) => {
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





app.listen(3000,()=>{
  console.log('Server started on port 3000');
})
