require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/materi', require('./routes/materi.routes'));
app.use('/api/rapot', require('./routes/rapot.routes'));
app.use('/api/quiz', require('./routes/quiz.routes'));
app.use('/api/leaderboard', require('./routes/leaderboard.routes'));
app.use('/api/userprofile', require('./routes/userprofile.routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
