const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Optionally seed an admin on startup when SEED_ADMIN_ON_START is set to 'true'
if (process.env.SEED_ADMIN_ON_START === 'true') {
  const { seedAdmin } = require('./seedAdmin');
  seedAdmin().catch((err) => console.error('Admin seed failed on startup:', err.message || err));
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/polls', require('./routes/pollRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
