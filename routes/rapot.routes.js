const express = require('express');
const router = express.Router();
const { verifyToken, isPengajar, isAdmin } = require('../middlewares/auth.middleware');
const rapotController = require('../controllers/rapot.controller');

// Simpan hasil kuis ke rapot
router.post('/', verifyToken, isPengajar, rapotController.createRapot);

// Ambil semua rapot milik user tertentu
router.get('/user/:userId', rapotController.getRapotByUser);

// Update rapot berdasarkan ID
router.put('/:id', verifyToken, isPengajar, rapotController.updateRapotById);

// Hapus rapot berdasarkan ID
router.delete('/:id', verifyToken, isPengajar, rapotController.deleteRapotById);

module.exports = router;