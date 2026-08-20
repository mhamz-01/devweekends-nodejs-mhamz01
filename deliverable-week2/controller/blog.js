const Router = require("express")
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const upload = require('../middlewares/multer')
const router = Router()

router.get('/add-new', (req, res) => {
    res.render('add-new-blog', { user: req.user })
})


router.post('/add-new', upload.single('coverImage'), async (req, res) => {
    if(!req.user){
        return res.redirect('/user/signin')
    }

    const {title, body} = req.body
    const coverImageURL = req.file ? `/uploads/covers/${req.file.filename}` : ''

    const blog = await Blog.create({
        title,
        body,
        coverImageURL,
        createdBy: req.user._id
    })

    return res.redirect(`/blog/${blog._id}`)
})

router.get("/:_id", async (req, res) => {
    const { _id } = req.params
    const blog = await Blog.findById(_id).populate('createdBy', 'fullName email')
    const comments = await Comment.find({ blogId: _id }).populate('createdBy', 'fullName')
    return res.render("blog",{
        user: req.user,
        blog,
        comments,
    })
})

router.post("/comment/:blogId",async(req,res)=> {
    if(!req.user){
        return res.redirect('/user/signin')
    }

    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router