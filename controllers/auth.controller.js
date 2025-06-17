const User = require('../models/user.model');
const UserProfile = require('../models/userprofile.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi untuk Registrasi
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah terdaftar.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ nama, email, password: hashedPassword, role });

    // Buat user profile setelah user berhasil dibuat
    await UserProfile.create({
      user: user._id,
      username: nama
    });

    res.status(201).json({ message: 'Registrasi sukses!' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Fungsi untuk Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah!' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fungsi untuk GET semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id nama email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};