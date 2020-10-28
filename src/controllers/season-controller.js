const express = require("express")
const Season = require("../models/Season")
const app = express.Router()

app.get("/seasons", async (req, res) => {
	const seasons = await Season.find()
	res.send(seasons)
})

app.post("/seasons", async (req, res) => {
	const season = new Season({
		title: req.body.title,
	})
	await season.save()
    res.send(season)
})

app.get("/seasons/:id", async (req, res) => {
    try {
	    const season = await Season.findOne({ _id: req.params.id })
        res.send(season)
    } catch (error){
        res.status(404)
		res.send({ error: "Season doesn't exist!" })
    }
})

app.put("/seasons/:id", async (req, res) => {
	try {
		const season = await Season.findOne({ _id: req.params.id })

        if(req.body.title) {
            season.title = req.body.title
        }

		await season.save()
		res.send(season)
	} catch (error) {
		res.status(404)
		res.send({ error: "Season doesn't exist!" })
	}
})

app.delete("/seasons/:id", async (req, res) => {
	try {
		await Season.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch (error) {
		res.status(404)
		res.send({ error: "Season doesn't exist!" })
	}
})

module.exports = app