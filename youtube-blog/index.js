const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const blogRouter = require('./controller/blog');
const { default: mongoose } = require('mongoose');
const userRouter = require('./controller/user');
const Blog = require('./models/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/blogify').then((e) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req, res) => {
    const blogs = Blog.find().populate('createdBy', 'fullName email').sort({ createdAt: -1 }).then((blogs) => {
    res.render('home', { user: req.user,blogs });
});
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})