const Rapot = require('../models/rapot.model');
const User = require('../models/user.model');

exports.getLeaderboard = async (req, res) => {
  try {
    // Aggregate total skor per user
    const leaderboard = await Rapot.aggregate([
      {
        $group: {
          _id: '$user',
          totalSkor: { $sum: '$skor' }
        }
      },
      {
        $sort: { totalSkor: -1 }
      }
    ]);

    // Populate nama user
    const result = await User.populate(leaderboard, { path: '_id', select: 'nama' });

    // Format hasil: rank, nama, totalSkor
    const formatted = result.map((item, idx) => ({
      rank: idx + 1,
      nama: item._id.nama,
      totalSkor: item.totalSkor
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};