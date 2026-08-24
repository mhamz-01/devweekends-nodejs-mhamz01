const { Router } = require('express')
const User = require('../models/user')
const { createTokenForuser } = require('../services/authentication')

const router = Router()

// GET /user/me - tells the React app who (if anyone) is currently logged in
router.get('/me', (req, res) => {
    return res.json({ user: req.user })
})

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const user = await User.create({ fullName, email, password })

        const token = createTokenForuser(user)
        res.cookie('token', token, { httpOnly: true })

        return res.status(201).json({
            user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role }
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const user = await User.matchPassword(email, password)

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = createTokenForuser(user)
    res.cookie('token', token, { httpOnly: true })

    return res.json({
        user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ message: 'Logged out' })
})

module.exports = router
