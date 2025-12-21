const Booking = require('../models/Booking');

// @desc    Create a booking
// @route   POST /api/bookings/create
// @access  Private (Student)
const createBooking = async (req, res) => {
    const { skillId, providerId, date, time, notes } = req.body;

    try {
        const booking = new Booking({
            skill: skillId,
            provider: providerId,
            learner: req.user._id,
            date,
            time,
            notes
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: 'Invalid booking data' });
    }
};

// @desc    Get my bookings (as learner)
// @route   GET /api/bookings/student/my-bookings
// @access  Private (Student)
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ learner: req.user._id })
            .populate('skill', 'title')
            .populate('provider', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my provided sessions (as teacher)
// @route   GET /api/bookings/student/my-provided-sessions
// @access  Private (Student)
const getProvidedSessions = async (req, res) => {
    try {
        const bookings = await Booking.find({ provider: req.user._id })
            .populate('skill', 'title')
            .populate('learner', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createBooking, getMyBookings, getProvidedSessions };
