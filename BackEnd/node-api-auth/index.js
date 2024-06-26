const express = require('express');
const { conectar } = require('./src/config/database');
const auth = require('./src/routes/authRoutes');
const cors = require('cors');
const server = express();
(async () => {
    try {
        await conectar();

    }catch(error){
        console.error('Erro generalizado.');
        process.exit(1);
    }
    
    server.use(cors());

    server.use(express.json());
    server.use('/api', auth);

    const APIPORT = process.env.APIPORT;
    server.listen(APIPORT, () => {
    console.log(`Server running on port ----> ${APIPORT}`);
  });

  })();