const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../controllers/auth.index')

app.post('/api/users', (req, res) => { //signup
        
            try {
                const user = new User({
                    email: req.body.email,
                    password: req.body.password
                });  
                user.save()

                res.json({
                    mensaje: "User Created",
                    user
                })
            } catch (error) {
                res.status(404)
		        res.send({ error: "User duplicated!" })
            }
})

app.get("/api/users", verifyToken, (req, res) => {


    jwt.verify(req.token, 'secretKey', (error, data) => {
        if(error){
            res.sendStatus(403)
        } else {
            const users = User.find()
            res.send(200, data)
        }
    })
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