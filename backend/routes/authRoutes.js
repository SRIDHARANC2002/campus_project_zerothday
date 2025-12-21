const express = require('express');
const router = express.Router();
const { loginStudent, registerStudent, loginAdmin, registerAdmin } = require('../controllers/authController');

// Helpful GET message for browsers (login expects POST)
router.get('/admin/login', (req, res) =>
  res.status(200).send('Use POST /api/users/admin/login with JSON {email, password} to login.')
);

router.post('/student/login', loginStudent);
router.post('/student/register', registerStudent);
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);

module.exports = router;
