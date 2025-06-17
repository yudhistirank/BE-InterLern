const Rapot = require('../models/rapot.model');

// Simpan hasil kuis ke rapot
exports.createRapot = async (req, res) => {
  try {
    const { user, materi, skor } = req.body;
    const rapot = new Rapot({ user, materi, skor });
    await rapot.save();
    res.status(201).json(rapot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ambil semua rapot milik user tertentu
exports.getRapotByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const rapot = await Rapot.find({ user: userId })
      .populate('materi', 'judul')
      .sort({ tanggal: -1 });
    res.json(rapot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update rapot berdasarkan ID
exports.updateRapotById = async (req, res) => {
  try {
    const { id } = req.params;
    const { skor } = req.body;
    const updatedRapot = await Rapot.findByIdAndUpdate(
      id,
      { skor },
      { new: true }
    );
    if (!updatedRapot) {
      return res.status(404).json({ message: 'Rapot tidak ditemukan' });
    }
    res.json(updatedRapot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus rapot berdasarkan ID
exports.deleteRapotById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRapot = await Rapot.findByIdAndDelete(id);
    if (!deletedRapot) {
      return res.status(404).json({ message: 'Rapot tidak ditemukan' });
    }
    res.json({ message: 'Rapot berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};