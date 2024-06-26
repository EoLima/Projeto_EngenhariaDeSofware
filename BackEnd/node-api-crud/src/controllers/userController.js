const User = require('../models/userModel');
const bcryptUtils = require('../utils/bcryptUtils');
const Joi = require('joi');
const { parse, format } = require('date-fns');


async function createUser(req, res) {
  const { firstName, lastName, email, phone, password, avatar, birthDate } = req.body;

  try {

    const parsedDate = parse(birthDate, 'dd/MM/yyyy', new Date());
    const isoDate = format(parsedDate, 'yyyy-MM-dd');

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
      avatar: Joi.string().allow(null, ''),
      birthDate: Joi.date().iso().required()
    });
    
    const { error, value } = schema.validate({ firstName, lastName, email, phone, password, avatar, birthDate: isoDate });

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
      avatar: value.avatar ? Buffer.from(value.avatar, 'base64').toString() : null,
      birthDate: isoDate
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function getUserById(req, res) {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({ message: 'Error retrieving user by ID' });
  }
}

async function updateUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  const { firstName, lastName, email, phone, password } = req.body;

  if (parseInt(req.user.tokenPayload.id, 10) !== userId) {
    console.log('Permission denied: User ID from token does not match request ID');
    return res.status(403).json({ msg: 'Not permission.' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        console.log('User with this email already exists');
        return res.status(400).json({ message: 'A user with this email already exists' });
      }
    }

    if (phone && phone !== user.phone) {
      const existingPhoneUser = await User.findOne({ where: { phone } });
      if (existingPhoneUser) {
        console.log('User with this phone number already exists');
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

    console.log('User updated successfully:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
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
