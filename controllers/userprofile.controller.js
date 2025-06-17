const UserProfile = require('../models/userprofile.model');

// [GET] Ambil profil user berdasarkan ID pengguna
exports.getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserProfile.findOne({ user: userId }).populate('user', 'nama email role');
    if (!profile) return res.status(404).json({ message: 'Profil tidak ditemukan' });
    res.json({ data: profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [POST] Buat atau perbarui profil
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updated = await UserProfile.findOneAndUpdate(
      { user: userId },
      { ...req.body, user: userId },
      { upsert: true, new: true }
    );

    res.json({ message: 'Profil berhasil disimpan', profile: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PUT] Update profil user (hanya jika sudah ada)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const existing = await UserProfile.findOne({ user: userId });
    if (!existing) {
      return res.status(404).json({ message: 'Profil tidak ditemukan, tidak bisa update' });
    }

    const updated = await UserProfile.findOneAndUpdate(
      { user: userId },
      { ...req.body },
      { new: true }
    );

    res.json({ message: 'Profil berhasil diperbarui', profile: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [DELETE] Hapus profil user (opsional untuk admin)
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await UserProfile.findOneAndDelete({ user: userId });
    res.json({ message: 'Profil berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
