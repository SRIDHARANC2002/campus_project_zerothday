const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const listUsers = async () => {
    try {
        await connectDB();

        console.log('Fetching all users...');
        const users = await User.find({}, 'name email role');
        console.log('--- SYSTEM USERS ---');
        users.forEach(u => {
            console.log(`[${u.role}] ${u.name} (${u.email})`);
        });
        console.log('--------------------');
        console.log(`Total count: ${users.length}`);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listUsers();
