const express = require("express")
const Chapter = require("../models/Chapter")
const app = express.Router()

app.get("/api/chapters", async (req, res) => {
	const chapters = await Chapter.find()
	res.send(chapters)
})

app.post("/api/chapters", async (req, res) => {
	const chapter = new Chapter({
		title: req.body.title,
		season: req.body.season
	})
	await chapter.save()
    res.send(chapter)
})

app.get("/api/chapters/:id", async (req, res) => {
    try {
	    const chapter = await Chapter.findOne({ _id: req.params.id })
        res.send(chapter)
    } catch (error){
        res.status(404)
		res.send({ error: "Chapter doesn't exist!" })
    }
})

app.put("/api/chapters/:id", async (req, res) => {
	try {
		const chapter = await Chapter.findOne({ _id: req.params.id })

        if(req.body.title) {
            chapter.title = req.body.title
        }
        if(req.body.gender) {
            chapter.gender = req.body.gender
        }

		await chapter.save()
		res.send(chapter)
	} catch (error) {
		res.status(404)
		res.send({ error: "Chapter doesn't exist!" })
	}
})

app.delete("/api/chapters/:id", async (req, res) => {
	try {
		await Chapter.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch (error) {
		res.status(404)
		res.send({ error: "Chapter doesn't exist!" })
	}
})

app.get("/api/chapters/:id/season", async (req,res)=> {
	try{
		const chapter = await Chapter.findOne({ _id: req.params.id })
		res.send(chapter)
	} catch(error){
		res.status(404)
		res.send({ error: "Chapter doesn't exist!" })
	}
})

module.exports = app