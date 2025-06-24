const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');

// @desc    Update user profile (name, email)
exports.updateProfile = async(req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({ message: "Profile updated", user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update user password
exports.updatePassword = async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};