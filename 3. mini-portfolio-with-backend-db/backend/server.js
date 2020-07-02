const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./database/videos")
const about = require("./database/about")

server.use(express.static("../public"))

server.set("view engine", "njk")

nunjucks.configure("../views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, resp) {
    return resp.render("about", { about })
})

server.get("/portfolio", function(req, resp) {
    return resp.render("portfolio", { items: videos })
})

server.get("/video", function(req, resp) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })
    
    if (!video) {
        return resp.status(404).send("Video not found!")
    }

    return resp.render("video", { item: video })
})

server.listen(3000, function() {
    console.log("server is running")
})