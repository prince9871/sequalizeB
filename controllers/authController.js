const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const authController = {};

// User registration
authController.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        // Respond with created user (without password)
        return res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        return res.status(500).json({ error: 'Registration failed' });
    }
};

// User login
authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
            expiresIn: '1h',
        });

        // Respond with token
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed' });
    }
};

// Get the current logged-in user's profile
authController.getProfile = async (req, res) => {
    try {
        // Retrieve the user ID from the request (this should be set by the auth middleware)
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with user profile information
        return res.json({ id: user.id, email: user.email });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve profile' });
    }
};

module.exports = authController;
