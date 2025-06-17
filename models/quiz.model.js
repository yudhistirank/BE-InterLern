const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  materiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Materi', required: true },
  questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
