const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: true, // Ativar SSL
  dialectOptions: {
    ssl: {
      require: true, // Requer SSL
      rejectUnauthorized: false // Rejeitar certificados autoassinados
    }
  }
});

async function conectar() {
  try {
    
    await sequelize.authenticate();
    console.log("Banco Conetado");
    await sequelize.sync();
    console.log("Banco Sincronizado");
  } catch (error) {
    console.error("Banco de dados não conectado!", error);
    process.exit(1); 
  }
}
  
module.exports = {
   sequelize, conectar
};