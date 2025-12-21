const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills/all
// @access  Public
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ status: 'approved' }).populate('provider', 'name email department year');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a skill
// @route   POST /api/skills/create
// @access  Private (Student)
const createSkill = async (req, res) => {
    const { title, description, category, experienceLevel, price, sessionDuration, availability, tags } = req.body;

    try {
        const skill = new Skill({
            title,
            description,
            category,
            experienceLevel,
            price,
            sessionDuration,
            availability,
            tags,
            provider: req.user._id
        });

        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid skill data' });
    }
};

// @desc    Get my skills
// @route   GET /api/skills/student/my-skills
// @access  Private (Student)
const getMySkills = async (req, res) => {
    try {
        const skills = await Skill.find({ provider: req.user._id });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get skill by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate('provider', 'name');
        if (skill) {
            res.json(skill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all skills for admin (including pending)
// @route   GET /api/skills/admin/all
// @access  Private (Admin)
const getAllSkillsAdmin = async (req, res) => {
    try {
        const skills = await Skill.find({}).populate('provider', 'name email department year');
        res.json({ skills }); // Frontend expects { skills: [...] } based on SkillExchangeAdmin.jsx:42
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update skill status (Approve/Reject)
// @route   PUT /api/skills/admin/:id/moderate
// @access  Private (Admin)
const updateSkillStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            skill.status = status;
            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete skill (Admin)
// @route   DELETE /api/skills/admin/:id
// @access  Private (Admin)
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            await skill.deleteOne();
            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllSkills, createSkill, getMySkills, getSkillById, getAllSkillsAdmin, updateSkillStatus, deleteSkill };
