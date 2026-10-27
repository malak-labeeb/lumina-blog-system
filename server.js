require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./src/presentation/routes/authRoutes'));
app.use('/api/blogs', require('./src/presentation/routes/blogRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));