const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        conn.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`);
        });

        conn.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            setTimeout(connectDB, 5000); // Try to reconnect after 5 seconds
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;