const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../controllers/auth.index')

app.post('/api/users', verifyToken, (req, res) => { //signup
    jwt.verify(req.token, 'secretKey', (error, data) => {
        if(error){
            res.sendStatus(403)
        } else {
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });  

            user.save()

            res.json({
                mensaje: "User Created",
                data
            })
        }
    })
})

app.get("/api/users", async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(404)
		res.send({ error: "User doesn't exist!" })
    }
})

app.post('/api/login', async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(email !== user.email || password !== user.password){
        res.send("Invalid email OR password input", 403)
    } else {
        jwt.sign({user}, 'secretKey', (err, token) => {
            res.json({
                token
            })
        })
    }
})

module.exports = app