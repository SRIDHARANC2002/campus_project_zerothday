const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const debugStudent = async () => {
    try {
        await connectDB();

        // Change this email to the one the user registered
        const email = 'sridharan1812@gmail.com';

        console.log(`Inspecting user: ${email}`);
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user);
            console.log('Role:', user.role);
            console.log('Student ID:', user.studentId);

            if (!user.studentId) {
                console.log('WARNING: Student ID is missing! Fixing it...');
                // Assuming the roll number from previous logs or asking user. 
                // User mentioned '23IT302' in the logs from previous turn.
                user.studentId = '23IT302';
                await user.save();
                console.log('User updated with Student ID: 23IT302');
            } else {
                console.log('Student ID is present.');
            }

            // Also check for password match if we want (requires knowing the password, skipping for now)

        } else {
            console.log('User not found!');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugStudent();
