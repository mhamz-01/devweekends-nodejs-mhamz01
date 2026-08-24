const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controller/blog');
const userRouter = require('./controller/user');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/mern-blogify').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// Vite picks the next free port (5173, 5174, ...) if one is already in use,
// so allow any localhost port to send/receive the auth cookie in dev.
app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
})
