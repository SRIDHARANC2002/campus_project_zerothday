const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    question: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        votes: { type: Number, default: 0 }
    }],
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
    votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track who voted to prevent duplicates
}, {
    timestamps: true
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
