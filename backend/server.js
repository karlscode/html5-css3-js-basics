const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./database/data")

server.use(express.static("../public"))

server.set("view engine", "njk")

nunjucks.configure("../views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, resp) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/26313317?s=460&v=4",
        name: "Carlos Anderson",
        role: "FullStack Developer",
        description: "Focused on technologies for building systems from Backend to Frontend. ",
        links: [
            {name: "GitHub", url: "https://github.com/karlscode"},
            {name: "LinkedIn", url: "https://www.linkedin.com/in/carlos-anderson-ti/"}
        ]
    }

    return resp.render("about", { about })
})

server.get("/portfolio", function(req, resp) {
    return resp.render("portfolio", { items: videos })
})

server.listen(3000, function() {
    console.log("server is running")
})