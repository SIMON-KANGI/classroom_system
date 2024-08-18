const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;  // 3 days in seconds

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge });
};

// User signup
module.exports.signup_post = async (req, res) => {
    const { name, email, password, role, subject } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ name, email, password, role, subject });
        newUser.setRole(email);

        // Save the new user
        await newUser.save();

        // Create and send the token
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });  // maxAge in milliseconds
        res.status(201).json({ token, userId: newUser._id, role: newUser.role });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and send the token
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });  // maxAge in milliseconds
        res.status(200).json({ message: "Logged in successfully", token,  user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
