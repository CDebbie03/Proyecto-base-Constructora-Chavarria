import express, { Request, Response } from 'express';
import cors from 'cors';
import {ITrabajador} from "./Models/ITrabajador";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {Trabajador} from "./Models/Trabajador";
const app = express();
const PORT: number = 3000;
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const archivoTrabajadores = path.join(__dirname, 'storage', 'trabajadores.json');


function leerTrabajadores(): ITrabajador[] {
  if (!fs.existsSync(archivoTrabajadores)) return [];
  const datos = fs.readFileSync(archivoTrabajadores, 'utf-8');
  return JSON.parse(datos);
}

function guardarTrabajadores(trabajadores: ITrabajador[]) {
  fs.writeFileSync(archivoTrabajadores, JSON.stringify(trabajadores, null, 2));
}


////////////////////////////////////////TRABAJADORES///////////////////////////////////////

////////////////////////GET
app.get('/trabajadores', (req: Request, res: Response) => {
  const lista = leerTrabajadores();
  res.json(lista);
});




////////////////////////POST
app.post('/trabajadores', (req: Request, res: Response) => {
  const { id, nombre, proyecto, horas } = req.body as ITrabajador;

  if (!id || !nombre || !proyecto || !horas) {
    return res.status(400).json({ message: 'Faltan datos del trabajador' });
  }

  const trabajadoresExistentes = leerTrabajadores();
  const existe = trabajadoresExistentes.find(t => t.id === id);

  if (existe) {
    return res.status(409).json({ message: 'El trabajador ya existe' });
  }

  const nuevo = new Trabajador(id, nombre, proyecto, horas);
  trabajadoresExistentes.push(nuevo);
  guardarTrabajadores(trabajadoresExistentes);

  res.status(201).json({ message: 'Trabajador agregado', trabajador: nuevo });
});




////////////////////////DELETE
app.delete('/trabajadores/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  let trabajadoresExistentes = leerTrabajadores();
  const index = trabajadoresExistentes.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Trabajador no encontrado' });
  }

  const eliminado = trabajadoresExistentes.splice(index, 1)[0];
  guardarTrabajadores(trabajadoresExistentes);

  res.json({ message: 'Trabajador eliminado', trabajador: eliminado });
});




////////////////////////PUT
app.put('/trabajadores/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nombre, proyecto, horas } = req.body as Partial<ITrabajador>;

  let trabajadoresExistentes = leerTrabajadores();
  const trabajador = trabajadoresExistentes.find(t => t.id === id);

  if (!trabajador) {
    return res.status(404).json({ message: 'Trabajador no encontrado' });
  }

  // Actualizar solo los campos enviados
  if (nombre !== undefined) trabajador.nombre = nombre;
  if (proyecto !== undefined) trabajador.proyecto = proyecto;
  if (horas !== undefined) trabajador.horas = horas;

  guardarTrabajadores(trabajadoresExistentes);

  res.json({ message: 'Trabajador actualizado', trabajador });
});

////////////////////////////////////////TRABAJADORES///////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
