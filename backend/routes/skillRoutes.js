const express = require('express');
const router = express.Router();
const {
    getAllSkills,
    createSkill,
    getMySkills,
    getSkillById,
    getAllSkillsAdmin,
    updateSkillStatus,
    deleteSkill
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.get('/all', getAllSkills);
router.get('/admin/all', getAllSkillsAdmin);
router.put('/admin/:id/moderate', updateSkillStatus);
router.delete('/admin/:id', deleteSkill);
router.get('/:id', getSkillById);
router.post('/create', protect, createSkill);
router.get('/student/my-skills', protect, getMySkills);

module.exports = router;
