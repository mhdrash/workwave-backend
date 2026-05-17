const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// POST /auth/sign-up
router.post('/sign-up', async (req, res) => {
    try {
        const foundUser = await User.findOne({ cpr: req.body.cpr })

        if (foundUser) {
            return res.status(409).json({ err: 'Username taken please sign in or Sign up with different username' })
        }

        const createdUser = await User.create({
            cpr: req.body.cpr,
            hashedPassword: bcrypt.hashSync(req.body.password, 12)
        })

        const userObject = createdUser.toObject()
        delete userObject.hashedPassword

        res.status(201).json({ user: userObject })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: err.message })
    }
})

// POST /auth/sign-in
router.post('/sign-in', async (req, res) => {
    try {
        const { cpr, password } = req.body

        const foundUser = await User.findOne({ cpr: cpr })

        if (!foundUser) {
            return res.status(401).json({ err: 'CPR not found, please signup' })
        }

        const doesPasswordMatch = bcrypt.compareSync(password, foundUser.hashedPassword)

        if (!doesPasswordMatch) {
            return res.status(401).json({ err: 'CPR or password incorrect' })
        }

        const payload = foundUser.toObject()
        delete payload.hashedPassword

        const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.json({ token })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: err.message })
    }
})

module.exports = router