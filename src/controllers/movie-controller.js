const express = require("express")
const Movie = require("../models/Movie")
const app = express.Router()
const verifyToken = require('../controllers/auth.index')
const jwt = require('jsonwebtoken')

app.get("/api/movies", async (req, res) => {
	try {
		const movies = await Movie.find()
		res.send(movies)
	} catch (error){
		res.status(404)
		res.send({ error: "Movie doesn't exist!" })
	}
})

app.post("/api/movies", verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretKey', (error, data) => {
        if(error){
            res.sendStatus(403)
        } else {
			const movie = new Movie({
				title: req.body.title,
				gender: req.body.gender
			})
			movie.save()
			res.send(movie)	
        }
	})
})

app.get("/api/movies/:id", async (req, res) => {
    try {
	    const movie = await Movie.findOne({ _id: req.params.id })
        res.send(movie)
    } catch (error){
        res.status(404)
		res.send({ error: "Movie doesn't exist!" })
    }
})

app.get("/api/movies/filter/:q", async (req, res) => {
	try {
		const movie = await Movie.find({ gender: req.params.q })
		res.send(movie)
	} catch (error){
		res.status(404)
		res.send({ error: "Movie doesn't exist!" })
	}
})

app.put("/api/movies/:id", async (req, res) => {
	try {
		const movie = await Movie.findOne({ _id: req.params.id })

        if(req.body.title) {
            movie.title = req.body.title
        }
        if(req.body.gender) {
            movie.gender = req.body.gender
        }

		await movie.save()
		res.send(movie)
	} catch (error) {
		res.status(404)
		res.send({ error: "Movie doesn't exist!" })
	}
})

app.delete("/api/movies/:id", async (req, res) => {
	try {
		await Movie.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch (error) {
		res.status(404)
		res.send({ error: "Movie doesn't exist!" })
	}
})

module.exports = app