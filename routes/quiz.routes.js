const express = require('express');
const router = express.Router();
const { verifyToken, isPengajar, isUser } = require('../middlewares/auth.middleware');
const quizController = require('../controllers/quiz.controller');

// Buat Quiz
router.post('/:materiId', verifyToken, isPengajar, quizController.createQuiz);

// Lihat Quiz
router.get('/:materiId', verifyToken, isUser, quizController.getQuizByMateri);

// Submit Quiz
router.post('/submit/:materiId', verifyToken, isUser, quizController.submitQuiz);

module.exports = router;
