const express = require("express")
const Director = require("../models/Director")
const app = express.Router()

app.get("/api/directors", async (req, res) => {
	const directors = await Director.find()
	res.send(directors)
})

app.post("/api/directors", async (req, res) => {
	try {
		const director = new Director({
			name: req.body.name,
			lastName: req.body.lastName,
			gender: req.body.gender
		})
		await director.save()
		res.send(director)
	} catch (error){
		res.status(404)
		res.send({ error: "Director doesn't exist!" })
	}
})

app.get("/api/directors/:id", async (req, res) => {
    try {
	    const director = await Director.findOne({ _id: req.params.id })
        res.send(director)
    } catch (error){
        res.status(404)
		res.send({ error: "Director doesn't exist!" })
    }
})

app.put("/api/directors/:id", async (req, res) => {
	try {
		const director = await Director.findOne({ _id: req.params.id })

        if(req.body.name) {
            director.name = req.body.name
        }
        if(req.body.lastName) {
            director.lastName = req.body.lastName
        }
        if(req.body.gender) {
            director.gender = req.body.gender
        }

		await director.save()
		res.send(director)
	} catch (error) {
		res.status(404)
		res.send({ error: "Director doesn't exist!" })
	}
})


app.delete("/api/directors/:id", async (req, res) => {
	try {
		await Director.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch (error) {
		res.status(404)
		res.send({ error: "Director doesn't exist!" })
	}
})

module.exports = app