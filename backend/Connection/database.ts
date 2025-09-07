import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(
  'constructora_chavarria', //nombre de base de datos
  'root', //usuario
  'root', // password
  {
    host:'localhost',
    port:3306,
    dialect:'mysql'

  }

)

sequelize.authenticate()
.then(() => {console.log('Conexion Establecida')})
.catch((error) => {console.error('Error de conexion'+error)});

export default sequelize;
