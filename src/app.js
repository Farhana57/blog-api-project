const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// রাউটগুলো ইমপোর্ট করা
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// এনভায়রনমেন্ট ভেরিয়েবল সেটআপ
dotenv.config();

const app = express();

// ১. মিডলওয়্যার সেটআপ
app.use(express.json()); // JSON ডাটা রিড করার জন্য
app.use(cors()); // ক্রস-অরিজিন এলাউ করার জন্য
app.use(cookieParser()); // কুকি রিড করার জন্য

// ২. ডাটাবেস কানেকশন
connectDB();

// ৩. এপিআই রাউটস (Endpoints)
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// ৪. বেস রাউট (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.send("Blog Management System API is running... 🚀");
});

// ৫. সার্ভার লিসেনিং
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
});

module.exports = app;