const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao criptografar senha:', error);
    throw new Error('Erro ao criptografar senha');
  }
}

module.exports = {encryptPassword};
