const express = require("express");
const PropertiesReader = require('properties-reader');
const app = express();
const properties = PropertiesReader('src/server/props.properties');
const fs = require("fs");
const http = require("http");

//properties
const port = properties.get("port");
const apiKey = properties.get("key");
const queue = fs.readFileSync("src/server/queueVideos.json");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, console.log("Server Working!"));

app.get("/", function (req, res) {
    console.log("root received");
    res.send({message: "Hola, estas usando: "+req.header("user-agent").split(")")[0].split("(")[1]});
});

app.get("/getQueue", function (req, res) {
    console.log("getQueue received");
    res.send(JSON.parse(queue))
});

