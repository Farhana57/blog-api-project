const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully... ✅");
    } catch (err) {
        console.error("Database Connection Failed! ❌", err.message);
        process.exit(1); // কানেকশন ফেইল করলে সার্ভার বন্ধ করে দিবে
    }
};

module.exports = connectDB;