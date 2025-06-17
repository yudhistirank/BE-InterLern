const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route untuk register dan login
router.post('/register', authController.register);
router.post('/login', authController.login);

// GET semua user
router.get('/users', authController.getAllUsers);

module.exports = router;
