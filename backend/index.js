const express =require('express') ;
const sequelize = require('./Connection/database');
const cors = require('cors');
const Trabajador = require('./Models/Trabajadores');
const Inventario = require('./Models/Inventarios');
const Proyecto = require('./Models/Proyectos');
const Usuario = require('./Models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificarToken = require('./middleware/auth')


// Asociación entre Trabajador y Proyecto
Trabajador.belongsTo(Proyecto, { foreignKey: 'proyecto_id' });
Proyecto.hasMany(Trabajador, { foreignKey: 'proyecto_id' });

// Asociación entre Inventario y Proyecto
Inventario.belongsTo(Proyecto, { foreignKey: 'proyecto_id' });
Proyecto.hasMany(Inventario, { foreignKey: 'proyecto_id' });

// Asociación entre Proyecto y Usuario
Proyecto.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Proyecto, { foreignKey: 'usuario_id' });

const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

// =======================
// RUTAS USUARIO
// =======================

app.post('/registro', async (req, res)=> {
  try{
    const { correo, password } = req.body;

    const usuarioExistente = await Usuario.findOne({where: {correo}});
    if(usuarioExistente){
      return res.status(409).json({ mensaje: 'El email ya esta registrado'});
    }

    const salt = await bcrypt.genSalt(10);
    const contraseniaEncriptada = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      correo,
      password: contraseniaEncriptada
    });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: nuevoUsuario})
  }catch(error){
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message})
  }
});


app.post('/login', async (req, res) => {

  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Por favor, ingresa el correo y la contraseña.' });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Email o contraseña incorrectos' });
  try{
    const { correo, password}= req.body;

    const usuario = await Usuario.findOne({where: {correo}});

    if(!usuario){
      return res.status(404).json({mensaje: 'Email o contraseña incorrectos'})
    }

    const contraseniaValida = await bcrypt.compare(password, usuario.password);


    if (!contraseniaValida) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const payload = {
      id: usuario.id,
    };

    const token = jwt.sign(payload, 'TU_SECETO_SUPER_SEGURO', { expiresIn: '1h' });

    res.status(200).json({ mensaje: 'Inicio de sesion exitoso', token: token, data: usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el inicio de sesion', error: error.message });
  }
});
    if(!contraseniaValida){
      return res.status(401).json({mensaje: 'Email o contraseña incorrectos'});
    }

    const payload={
      id: usuario.id,
    }

    const token = jwt.sign(payload, 'TU_SECETO_SUPER_SEGURO', {expiresIn: '1h'});

    res.status(200).json({mensaje: 'Inicio de sesion exitoso', token: token, data: usuario})
  } catch(error){
      res.status(500).json({mensaje: 'Error en el inicio de sesion', error: error.message})
  }
})


// =======================
// RUTAS CRUD TRABAJADOR
// =======================

// Obtener todos los trabajadores

app.get('/trabajadores', verificarToken, async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll({
      include: [{
        model: Proyecto,
        attributes: ['nombre']
      }]
    });
    res.status(200).json(trabajadores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener trabajadores', error: err.message });
  }
});

// Crear un trabajador
app.post('/trabajadores', verificarToken, async (req, res) => {
  try {
    const { proyecto_nombre, ...otrosDatos } = req.body; 

    const proyecto = await Proyecto.findOne({ where: { nombre: proyecto_nombre } });

    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    const trabajador = await Trabajador.create({
      ...otrosDatos,
      proyecto_id: proyecto.id
    });

    res.status(201).json(trabajador);
  } catch (err) {
    console.error('Error en la ruta POST /trabajadores:', err);
    res.status(500).json({ error: 'Error al crear el trabajador' });

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
app.get('/trabajadores/:id', verificarToken, async (req, res) => {

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

app.put('/trabajadores/:id', verificarToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { proyecto_nombre, ...otrosDatos } = req.body;
  
      const proyecto = await Proyecto.findOne({ where: { nombre: proyecto_nombre } });
  
      if (!proyecto) {
        return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
      }
  
      const trabajador = await Trabajador.update(
        { ...otrosDatos, proyecto_id: proyecto.id },
        { where: { id: id } }
      );
  
      if (trabajador[0] === 0) {
        return res.status(404).json({ mensaje: 'Trabajador no encontrado' });
      }
  
      res.status(200).json({ mensaje: 'Trabajador actualizado con éxito' });
    } catch (err) {
      console.error('Error en la ruta PUT /trabajadores:', err);
      res.status(500).json({ error: 'Error al actualizar el trabajador' });
    }
});

// Eliminar un trabajador
app.delete('/trabajadores/:id', verificarToken, async (req, res) => {

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

app.get('/inventario', verificarToken, async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
      include: [{
        model: Proyecto,
        attributes: ['nombre']
      }]
    });

app.get('/inventario', async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
});

// Crear un elemento de inventario
app.post('/inventario', verificarToken, async (req, res) => {
  try {
    const { proyecto_nombre, ...otrosDatos } = req.body;
    const proyecto = await Proyecto.findOne({ where: { nombre: proyecto_nombre } });

    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    const nuevoItem = await Inventario.create({
      ...otrosDatos,
      proyecto_id: proyecto.id
    });

    res.status(201).json(nuevoItem);
  } catch (err) {
    console.error('Error al crear el ítem de inventario:', err);
app.post('/inventario', async (req, res) => {
  try {
    const nuevoItem = await Inventario.create(req.body);
    res.status(201).json(nuevoItem);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear un elemento de inventario' });
  }
});

// Obtener un elemento de inventario por id

app.get('/inventario/:id', verificarToken, async (req, res) => {
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
app.put('/inventario/:id', verificarToken, async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Elemento de inventario no encontrado' });

    const { proyecto_nombre, ...otrosDatos } = req.body;

    let proyecto_id = item.proyecto_id;

    if (proyecto_nombre) {
      const proyecto = await Proyecto.findOne({ where: { nombre: proyecto_nombre } });
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
      proyecto_id = proyecto.id;
    }

    await item.update({ ...otrosDatos, proyecto_id });
    res.json(item);
  } catch (err) {
    console.error(err);

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

app.delete('/inventario/:id', verificarToken, async (req, res) => {
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




// =======================
// RUTAS CRUD PROYECTO
// =======================


// Obtener todos los proyectos
app.get('/proyectos', verificarToken, async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un proyecto
app.post('/proyectos', verificarToken, async (req, res) => {
    try {
        const { nombre, estado, descripcion, comentario } = req.body;
        
        const usuario_id = req.usuario.id;

        const nuevoProyecto = await Proyecto.create({
            nombre,
            estado,
            descripcion,
            comentario,
            usuario_id
        });

        res.status(201).json(nuevoProyecto);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear proyecto', error: err.message });
    }
});

// Obtener un proyecto por id
app.get('/proyectos/:id', verificarToken, async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un proyecto
app.put('/proyectos/:id', verificarToken, async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    await proyecto.update(req.body);
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un proyecto
app.delete('/proyectos/:id', verificarToken, async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    await proyecto.destroy();
    res.json({ message: 'Proyecto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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


  


