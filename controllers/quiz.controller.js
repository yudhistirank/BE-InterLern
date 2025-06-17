const Quiz = require('../models/quiz.model');

// Buat Quiz baru
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      materiId: req.params.materiId,
      questions: req.body.questions
    });
    res.json({ message: 'Quiz berhasil dibuat', quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lihat Quiz (tanpa jawaban benar)
exports.getQuizByMateri = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ materiId: req.params.materiId });
    if (!quiz) return res.status(404).json({ message: 'Quiz tidak ditemukan' });

    const sanitized = quiz.questions.map(q => ({
      question: q.question,
      options: q.options
    }));

    res.json({ materiId: quiz.materiId, questions: sanitized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit Quiz
exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ materiId: req.params.materiId });
    if (!quiz) return res.status(404).json({ message: 'Quiz tidak ditemukan' });

    const answers = req.body.answers;
    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] && answers[i] === q.correctAnswer) {
        score++;
      }
    });

    res.json({
      message: 'Quiz selesai',
      total: quiz.questions.length,
      benar: score
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
