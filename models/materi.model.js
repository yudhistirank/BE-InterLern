const mongoose = require('mongoose');

// skema DB untuk model Materi
const materiSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
  videoUrl: String,
  teksPenjelasan: String,
  quiz: [
    {
      pertanyaan: String,
      opsi: [String],
      jawabanBenar: String
    }
  ],
  dibuatOleh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Materi', materiSchema);
