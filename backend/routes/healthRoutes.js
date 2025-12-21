const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple health check that is safe to expose: does not reveal secrets
router.get('/', async (req, res) => {
  try {
    const jwtSet = !!process.env.JWT_SECRET;
    const admin = await User.findOne({ role: 'admin' }).select('email name role');

    res.json({
      ok: true,
      jwtSet,
      adminExists: !!admin,
      admin: admin ? { email: admin.email, name: admin.name } : null,
    });
  } catch (err) {
    console.error('Health check error:', err.message || err);
    res.status(500).json({ ok: false, message: 'Health check failed', error: err.message });
  }
});

module.exports = router;