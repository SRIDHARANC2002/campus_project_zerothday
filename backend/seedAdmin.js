const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const User = require('./models/User');

// Seed admin function, safe to import and call without exiting the process
const seedAdmin = async (options = {}) => {
  try {
    // Ensure DB is connected
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || options.email || 'admin@example.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || options.password || 'admin';
    const adminName = process.env.SEED_ADMIN_NAME || options.name || 'Admin';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log(`Admin user already exists with email: ${adminEmail}`);
      return { existed: true, admin };
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
    return { created: true, admin };
  } catch (error) {
    console.error('❌ Failed to create admin:', error.message || error);
    throw error;
  }
};

// If run directly, execute and exit (useful for `npm run seed-admin`)
if (require.main === module) {
  seedAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedAdmin };