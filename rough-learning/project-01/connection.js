const mongoose = require('mongoose');





const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection failed");
        console.log(err);
    }
};

module.exports = connectDB;

