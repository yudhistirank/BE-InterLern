const express = require('express');
const router = express.Router();
const { verifyToken, isUser } = require('../middlewares/auth.middleware');
const leaderboardController = require('../controllers/leaderboard.controller');

router.get('/', verifyToken, isUser, leaderboardController.getLeaderboard);

module.exports = router;