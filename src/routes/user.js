const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello, user!')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    let newUser
    let secretKey

    const user = await User.findOne({email})

    if (user) return res.status(401).json({message: "It's already registered!"})
    
    newUser = new User({email, password})
    secretKey = jwt.sign( {_id: newUser._id}, "secretKey")

    await newUser.save()

    console.log(newUser)
    
    return res.status(200).json({ secretKey })
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    let secretKey

    const user = await User.findOne({email})

    if (!user) return res.status(401).json({message: "The email does'nt exists"})
    if (user.password !== password) return res.status(401).json({message: "Wrong password"})

    secretKey = jwt.sign( {_id: newUser._id}, "secretKey")

    return res.status(200).json({ secretKey })
})

module.exports = router