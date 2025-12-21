const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin';
    const adminName = process.env.SEED_ADMIN_NAME || 'Admin';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log(`Admin user already exists with email: ${adminEmail}`);
      process.exit(0);
    }

    admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created:');
    console.log(`   email: ${admin.email}`);
    console.log(`   name: ${admin.name}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin:', error.message || error);
    process.exit(1);
  }
};

seedAdmin();