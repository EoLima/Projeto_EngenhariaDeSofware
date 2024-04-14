const { sequelize, checkDatabaseConnection } = require('./config/database');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

(async () => {
  try {
    await checkDatabaseConnection();

    /*
      Caso não seja criado tabelas no banco de dados
      habilite os codigos dentro do comentario

    await sequelize.sync({ alter: true });
    console.log('Data models synchronized ----> OK');
    */  

  } catch (error) {
    console.error('Data models synchronized ----> BAD', error);
    process.exit(1);
  }
  app.use(express.json());
  app.use('/api', userRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ----> ${PORT}`);
  });
})();
