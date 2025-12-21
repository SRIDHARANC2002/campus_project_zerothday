const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionDuration: { type: Number, required: true, default: 60 },
    price: { type: Number, required: true, default: 0 },
    availability: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } // Change default to pending for moderation
}, {
    timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
