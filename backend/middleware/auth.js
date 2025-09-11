const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({mensaje: 'Acceso denegado. No se proporciono el token'});
    }

    try{
        const verificado = jwt.verify(token, 'TU_SECETO_SUPER_SEGURO');
        req.usuario = verificado;
        next();
    }catch(error){
        res.status(400).json({ mensaje: 'Token invalido'});
    }
}

module.exports = verificarToken;