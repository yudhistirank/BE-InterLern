const mongoose = require('mongoose');

// skema DB untuk model User
const userSchema = new mongoose.Schema({
  nama: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'pengajar', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
