const mongoose = require('mongoose');

const rapotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  materi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materi',
    required: true
  },
  skor: {
    type: Number,
    required: true
  },
  tanggal: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rapot', rapotSchema);