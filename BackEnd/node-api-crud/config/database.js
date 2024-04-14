const { Sequelize } = require('sequelize');

// nome banco de dados - usuario - senha
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  dialect: 'postgres', // Deve ser uma string representando o nome do dialeto do banco de dados
  host: 'localhost', // Endereço do host do banco de dados
  port: 5432,
});

async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection ----> OK");
  } catch (error) {
    console.error("Database connection ----> BAD", error);
    process.exit(1); 
  }
}

module.exports = { sequelize, checkDatabaseConnection };
