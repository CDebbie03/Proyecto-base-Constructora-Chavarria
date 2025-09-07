const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'constructora_chavarria', // nombre de base de datos
  'root', // usuario
  'admin123', // password
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida');
  })
  .catch((error) => {
    console.error('Error de conexión: ' + error);
  });

module.exports = sequelize;
