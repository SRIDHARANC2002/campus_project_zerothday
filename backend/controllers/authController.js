const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token (validate secret)
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/student/login
// @access  Public
const loginStudent = async (req, res) => {
    const { email, rollNumber, password } = req.body;
    console.log('Login Student Attempt:', { email, rollNumber });

    let user;
    if (email) {
        user = await User.findOne({ email });
    } else if (rollNumber) {
        user = await User.findOne({ studentId: rollNumber });
    }

    if (user && (await user.matchPassword(password))) {
        if (user.role !== 'student') {
            return res.status(401).json({ message: 'Invalid role. Please login as Admin.' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// @desc    Register a new student
// @route   POST /api/users/student/register
// @access  Public
const registerStudent = async (req, res) => {
    console.log('Register Student Payload:', req.body);
    const { name, email, password, department, year, studentId } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'student',
        department,
        year,
        studentId
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth admin & get token
// @route   POST /api/users/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login Admin Attempt:', { email });

        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');

        const isMatch = user ? await user.matchPassword(password) : false;
        console.log('Password match:', isMatch);
        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'Invalid role. Please login as Student.' });
        }

        // Ensure JWT secret exists before signing
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET missing in environment');
            return res.status(500).json({ message: 'Server misconfiguration: authentication unavailable' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Login admin error:', error.message || error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc    Register a new admin (Protected or seed)
// @route   POST /api/users/admin/register
// @access  Public (should be protected in prod)
const registerAdmin = async (req, res) => {
    const { name, email, password, adminLevel } = req.body;

    // If an admin already exists and registration is not explicitly allowed, block it
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists && process.env.ALLOW_ADMIN_REGISTRATION !== 'true') {
        return res.status(403).json({ message: 'Admin registration is disabled' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'admin',
        adminLevel
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

module.exports = { loginStudent, registerStudent, loginAdmin, registerAdmin };
