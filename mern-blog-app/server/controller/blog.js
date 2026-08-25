const { Router } = require('express')
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const router = Router()

// GET /blog - list all blogs, newest first (used by the home page)
router.get('/', async (_req, res) => {
    const blogs = await Blog.find().populate('createdBy', 'fullName email').sort({ createdAt: -1 })
    return res.json({ blogs })
})

router.post('/add-new', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be signed in to create a blog' })
    }

    const { title, body } = req.body

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id
    })

    return res.status(201).json({ blog })
})

router.get('/:_id', async (req, res) => {
    const { _id } = req.params
    const blog = await Blog.findById(_id).populate('createdBy', 'fullName email')

    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
    }

    const comments = await Comment.find({ blogId: _id }).populate('createdBy', 'fullName')
    return res.json({ blog, comments })
})

router.post('/comment/:blogId', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be signed in to comment' })
    }

    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })

    return res.status(201).json({ comment })
})

module.exports = router
