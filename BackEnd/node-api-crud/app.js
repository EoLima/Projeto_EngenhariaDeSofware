const { sequelize, checkDatabaseConnection } = require('./src/config/database');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const app = express();


(async () => {
  try {
    await checkDatabaseConnection();

    
    await sequelize.sync({ alter: true });
    console.log('Data models synchronized ----> OK');
    

  } catch (error) {
    console.error('Data models synchronized ----> BAD', error);
    process.exit(1);
  }
  app.use(express.json());
  app.use('/api', userRoutes);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ----> ${PORT}`);
  });
})();
