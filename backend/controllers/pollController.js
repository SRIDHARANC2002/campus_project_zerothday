const Poll = require('../models/Poll');

// @desc    Get active polls (Student)
// @route   GET /api/polls/active
// @access  Private (Student)
const getActivePolls = async (req, res) => {
    try {
        const filter = { isActive: true };
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const polls = await Poll.find(filter);
        // Return as an object to match frontend expectations
        res.json({ polls });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get poll categories (public)
// @route   GET /api/polls/categories
// @access  Public
const getPollCategories = async (req, res) => {
    try {
        const categories = await Poll.distinct('category');
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all polls (Admin)
// @route   GET /api/polls/admin/all
// @access  Private (Admin)
const getAllPollsForAdmin = async (req, res) => {
    try {
        const polls = await Poll.find({});
        res.json(polls);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new poll
// @route   POST /api/polls/create
// @access  Private (Admin)
const createPoll = async (req, res) => {
    const { question, options, category } = req.body;

    try {
        const poll = new Poll({
            question,
            options: options.map(opt => ({ text: opt, votes: 0 })),
            category,
            createdBy: req.user._id
        });

        const createdPoll = await poll.save();
        res.status(201).json(createdPoll);
    } catch (error) {
        res.status(400).json({ message: 'Invalid poll data' });
    }
};

// @desc    Vote on a poll
// @route   POST /api/polls/:id/vote
// @access  Private (Student)
const voteOnPoll = async (req, res) => {
    const { selectedOptions } = req.body; // Array of option texts or indices

    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (poll.votedBy.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Update votes
        // Assuming selectedOptions is an array of option texts
        selectedOptions.forEach(selectedOpt => {
            const option = poll.options.find(o => o.text === selectedOpt);
            if (option) {
                option.votes += 1;
            }
        });

        poll.votedBy.push(req.user._id);
        await poll.save();

        res.json({ message: 'Vote recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a poll
// @route   DELETE /api/polls/admin/:id
// @access  Private (Admin)
const deletePoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (poll) {
            await poll.remove();
            res.json({ message: 'Poll removed' });
        } else {
            res.status(404).json({ message: 'Poll not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update poll status
// @route   PUT /api/polls/admin/:id/status
// @access  Private (Admin)
const updatePollStatus = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (poll) {
            poll.isActive = req.body.status;
            await poll.save();
            res.json(poll);
        } else {
            res.status(404).json({ message: 'Poll not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get poll statistics
// @route   GET /api/polls/stats
// @access  Public
const getPollStats = async (req, res) => {
    try {
        const totalPolls = await Poll.countDocuments();
        const activePolls = await Poll.countDocuments({ status: 'active' });
        const completedPolls = await Poll.countDocuments({ status: 'closed' });

        // Calculate total votes across all polls
        const polls = await Poll.find();
        const totalVotes = polls.reduce((acc, poll) => {
            return acc + poll.options.reduce((sum, option) => sum + option.votes, 0);
        }, 0);

        res.json({
            totalPolls,
            activePolls,
            completedPolls,
            totalVotes
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getActivePolls,
    getPollCategories,
    getAllPollsForAdmin,
    createPoll,
    voteOnPoll,
    deletePoll,
    updatePollStatus,
    getPollStats
};
