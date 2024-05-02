const User = require('../models/userModel');
const bcryptUtils = require('../utils/bcryptUtils');
const Joi = require('joi');


async function createUser(req, res) {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const schema = Joi.object({
      firstName: Joi.string().max(50).required(), 
      lastName: Joi.string().max(50).required(),  
      email: Joi.string().email().required(),
      phone: Joi.string()
        .required()
        .pattern(new RegExp('^[0-9]+$'))
        .message('Phone must contain only digits'),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9]).{6,}$'))
        .required()
        .messages({
          'string.min': 'Password must be at least 6 characters long',
          'string.pattern.base': 'Password must contain at least one uppercase letter and one number',
          'any.required': 'Password is required',
        }),
    });
    
    const { error, value } = schema.validate({ firstName, lastName, email, phone, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingEmailUser = await User.findOne({ where: { email } });
    if (existingEmailUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const existingPhoneUser = await User.findOne({ where: { phone } });
    if (existingPhoneUser) {
      return res.status(400).json({ message: 'A user with this phone number already exists' });
    }

    const hashedPassword = await bcryptUtils.encryptPassword(password);

    const newUser = await User.create({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}



async function getUserById(req, res) {
  //
}


async function updateUser(req, res) {
  //
}


async function deleteUser(req, res) {
  //
}

module.exports = { 
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
