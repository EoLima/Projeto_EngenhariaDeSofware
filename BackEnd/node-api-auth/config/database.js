const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize( process.env.DATABASENAME,  process.env.DATABASEUSERNAME,  process.env.DATABASEPASSWORD, {
  dialect: 'postgres', 
  host: process.env.DATABASEHOST, 
  port:  process.env.DATABASEPORT
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