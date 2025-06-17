const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const userProfileController = require('../controllers/userprofile.controller');

// Ambil profil user
router.get('/public/:userId', userProfileController.getPublicProfile);

// Buat atau update profil user
router.post('/', verifyToken, userProfileController.upsertProfile);

// Update profil user (eksplisit)
router.put('/', verifyToken, userProfileController.updateProfile);

// Hapus profil user (opsional)
router.delete('/', verifyToken, userProfileController.deleteProfile);

module.exports = router;
