const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

//controllers
const routeAuth = require("./src/controllers/auth-controller")
const routeDirector = require("./src/controllers/director-controller")
const routeMovie = require("./src/controllers/movie-controller")
const routeChapter = require("./src/controllers/chapter-controller")
const routeSeason = require("./src/controllers/season-controller")

mongoose
	.connect("mongodb://localhost:27017/bd_movies", { useNewUrlParser: true })
	.then(() => {
        const app = express()
        
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        //routes
        app.use("/", routeAuth)
        app.use("/", routeDirector)
        app.use("/", routeMovie)
        app.use("/", routeChapter)
        app.use("/", routeSeason)

		app.listen(3000, () => {
			console.log("Server has started!")
		})
	})
