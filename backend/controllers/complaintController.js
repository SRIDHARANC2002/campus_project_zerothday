const Complaint = require('../models/Complaint');

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private (Student)
const createComplaint = async (req, res) => {
    const { title, description, category, priority } = req.body;

    try {
        const complaint = new Complaint({
            title,
            description,
            category,
            priority,
            student: req.user._id
        });

        const createdComplaint = await complaint.save();
        res.status(201).json(createdComplaint);
    } catch (error) {
        res.status(400).json({ message: 'Invalid complaint data' });
    }
};

// @desc    Get my complaints
// @route   GET /api/complaints/my
// @access  Private (Student)
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ student: req.user._id });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints/admin/all
// @access  Private (Admin)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({}).populate('student', 'name email');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/admin/:id/status
// @access  Private (Admin)
const updateComplaintStatus = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (complaint) {
            complaint.status = req.body.status;
            complaint.adminResponse = req.body.adminResponse; // Optional response
            await complaint.save();
            res.json(complaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus };
