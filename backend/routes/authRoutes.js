const express = require('express');
const router = express.Router();
const { loginStudent, registerStudent, loginAdmin, registerAdmin } = require('../controllers/authController');

router.post('/student/login', loginStudent);
router.post('/student/register', registerStudent);
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);

module.exports = router;
