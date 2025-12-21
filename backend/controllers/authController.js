const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
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
    const { email, password } = req.body;
    console.log('Login Admin Attempt:', { email, password });

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (user) {
        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch);
        console.log('User role:', user.role);
    }

    if (user && (await user.matchPassword(password))) {
        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'Invalid role. Please login as Student.' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new admin (Protected or seed)
// @route   POST /api/users/admin/register
// @access  Public (should be protected in prod)
const registerAdmin = async (req, res) => {
    const { name, email, password, adminLevel } = req.body;

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
