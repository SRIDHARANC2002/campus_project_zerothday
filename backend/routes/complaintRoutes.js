const express = require('express');
const router = express.Router();
const { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/admin/all', protect, admin, getAllComplaints);
router.put('/admin/:id/status', protect, admin, updateComplaintStatus);

module.exports = router;
