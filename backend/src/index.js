import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

const dbPath = (name) => path.join(__dirname, '../storage', `${name}.json`);
const readJson = (name) => JSON.parse(fs.readFileSync(dbPath(name), 'utf-8'));
const writeJson = (name, data) => fs.writeFileSync(dbPath(name), JSON.stringify(data, null, 2));

// Rutas base
app.get('/health', (_, res) => res.json({ ok: true }));

// Proyectos
app.get('/proyectos', (_, res) => res.json(readJson('proyectos')));
app.post('/proyectos', (req, res) => {
  const data = readJson('proyectos');
  const nuevo = { id: Date.now().toString(), ...req.body };
  data.push(nuevo);
  writeJson('proyectos', data);
  res.status(201).json(nuevo);
});

// Trabajadores
app.get('/trabajadores', (_, res) => res.json(readJson('trabajadores')));

// Herramientas
app.get('/herramientas', (_, res) => res.json(readJson('herramientas')));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));
