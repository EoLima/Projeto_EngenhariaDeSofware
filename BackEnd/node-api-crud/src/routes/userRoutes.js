const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../controllers/authController')
const router = express.Router();

router.post('/', userController.createUser); 
router.get('/:id', userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
