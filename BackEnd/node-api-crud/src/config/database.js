const { Sequelize } = require('sequelize');
require('dotenv').config();


// nome banco de dados - usuario - senha
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
