const {Sequelize}= require('sequelize');

const sequelize = new Sequelize(
    'constructora_chavarria',
    'root',
    'root',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

sequelize.authenticate()
    .then(() => console.log('Conexion establecida'))
    .catch(error=> console.log('Error de conexion' + error))

module.exports=sequelize;  


