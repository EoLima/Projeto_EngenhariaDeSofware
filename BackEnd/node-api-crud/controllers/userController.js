const User = require('../models/userModel');
const bcryptUtils = require('../utils/bcryptUtils');

async function createUser(req, res) {
  //
}

async function getUserById(req, res) {
  //
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return res.status(400).json({ message: 'A user with this email already exists' });
      }
    }

    if (phone && phone !== user.phone) {
      const existingPhoneUser = await User.findOne({ where: { phone } });
      if (existingPhoneUser) {
        return res.status(400).json({ message: 'A user with this phone number already exists' });
      }
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (password) {
      const hashedPassword = await bcryptUtils.encryptPassword(password);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

module.exports = { 
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
