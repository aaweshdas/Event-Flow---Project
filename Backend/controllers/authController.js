const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, department, studentId } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Domain validation based on role
        if (role === 'student' && !email.endsWith('@adityauniversity.in')) {
            return res.status(400).json({ message: 'Student email must end with @adityauniversity.in' });
        }
        if (role === 'admin' && !email.endsWith('@aditya.edu')) {
            return res.status(400).json({ message: 'Admin email must end with @aditya.edu' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role,
            department,
            studentId
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: error.message || 'Server error', error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // Additional security: Ensure email domain matches role for existing users
            if (user.role === 'student' && !email.endsWith('@adityauniversity.in')) {
                return res.status(401).json({ message: 'Student account must use @adityauniversity.in' });
            }
            if (user.role === 'admin' && !email.endsWith('@aditya.edu')) {
                return res.status(401).json({ message: 'Admin account must use @aditya.edu' });
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message || 'Server error', error: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
