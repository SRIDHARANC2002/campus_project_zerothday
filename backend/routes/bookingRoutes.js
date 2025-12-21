const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getProvidedSessions } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createBooking);
router.get('/student/my-bookings', protect, getMyBookings);
router.get('/student/my-provided-sessions', protect, getProvidedSessions);

module.exports = router;
