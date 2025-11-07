const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        console.log('🔗 Connecting to MongoDB...');
        
        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(uri, options);
        console.log('✅ Connected to MongoDB successfully!');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = { connectDB, mongoose };