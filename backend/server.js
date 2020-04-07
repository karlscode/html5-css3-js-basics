const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./database/data")

server.use(express.static("../public"))

server.set("view engine", "njk")

nunjucks.configure("../views", {
    express: server
})

server.get("/", function(req, resp) {
    return resp.render("about")
})

server.get("/portfolio", function(req, resp) {
    return resp.render("portfolio", { items: videos })
})

server.listen(5000, function() {
    console.log("server is running")
})