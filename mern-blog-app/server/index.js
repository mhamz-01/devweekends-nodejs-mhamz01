require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controller/blog');
const userRouter = require('./controller/user');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// Allow the deployed frontend (CLIENT_URL) plus any localhost port in dev,
// since Vite picks the next free port (5173, 5174, ...) if one is already in use.
const localhostPattern = /^http:\/\/localhost:\d+$/;
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === process.env.CLIENT_URL || localhostPattern.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use('/user', userRouter);
app.use('/blog', blogRouter);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`);
    });
}

module.exports = app;
