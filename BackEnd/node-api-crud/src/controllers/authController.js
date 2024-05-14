const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido. Acesso não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido. Acesso não autorizado.' });
  }
}

module.exports = authMiddleware;