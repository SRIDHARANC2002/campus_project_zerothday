const express = require('express');
const router = express.Router();
const {
    getActivePolls,
    getPollCategories,
    getAllPollsForAdmin,
    createPoll,
    voteOnPoll,
    deletePoll,
    updatePollStatus,
    getPollStats
} = require('../controllers/pollController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/stats', getPollStats);
router.get('/categories', getPollCategories);

// Student routes
router.get('/active', protect, getActivePolls);
router.post('/:id/vote', protect, voteOnPoll);

// Admin routes
router.get('/admin/all', protect, admin, getAllPollsForAdmin);
router.post('/create', protect, admin, createPoll);
router.put('/admin/:id/status', protect, admin, updatePollStatus);
router.delete('/admin/:id', protect, admin, deletePoll);

module.exports = router;
