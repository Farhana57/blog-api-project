const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ১. ইউজার রেজিস্ট্রেশন
exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        });

        await newUser.save();
        res.status(201).json({ message: "Registration Successful! ✅" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ২. ইউজার লগইন
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid Credentials! ❌" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true }).json({ 
            message: "Login Successful! 🚀",
            token 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৩. গেট লগড-ইন ইউজার প্রোফাইল
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৪. আপডেট প্রোফাইল
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            { $set: req.body }, 
            { new: true }
        ).select('-password');
        
        res.json({ message: "Profile Updated! ✨", updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};