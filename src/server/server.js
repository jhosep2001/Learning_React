const express = require("express");
const PropertiesReader = require('properties-reader');
const app = express();
const properties = PropertiesReader('src/server/props.properties');
const fs = require("fs");
const http = require("http");
const {Pool, Client} = require("pg");

//properties
const port = properties.get("port");
const apiKey = properties.get("key");
const queue = fs.readFileSync("src/server/queueVideos.json");

//database properties
const dbHost = properties.get("dbHost");
const dbPort = properties.get("dbPort");
const dbName = properties.get("dbName");
const dbUser = properties.get("dbUser");
const dbPassword = properties.get("");

const dbProperties = {
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword != null ? dbPassword: "",
    port: dbPort,
}

//Database Configuration
const client = new Client(dbProperties);

//server Configuration
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, () => {
    console.log("Server Working!");
    client.connect();
});

//Request
app.get("/", function (req, res) {
    res.send({message: "Hola, estas usando: "+req.header("user-agent").split(")")[0].split("(")[1]});
});

app.get("/apiKey", function (req, res) {
    res.send({key: apiKey});
});

app.get("/getList/:id", function (req, res) {
    let name = req.params.id ? req.params.id: "";
    console.log("GetList received", name);
    client.query(
        "SELECT id FROM lists " +
        "WHERE name = $1", [name]
    ).then(data => {
        console.log(data);
        if(data.rowCount >0){
            res.send({exist: true});
        } else {
            res.send({exist: false});
        }
    }).catch(e => {

    })
});

app.get("/getQueue/:id", function (req, res) {
    let listName = req.params.id;
    console.log("getQueue for "+listName);
    //Data base query
    client.query(
        "SELECT videoid FROM " +
        "lists_video " +
        "WHERE lists_id = (" +
            "SELECT id FROM lists " +
            "WHERE name = $1" +
        ")", [listName])
        .then(data => {
            res.send({videosId: data.rows});
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        })
        .catch(e => {
            console.error(e.stack);
            res.send({videosId: ["bE3ABNHDnAc"]});
        });
});

