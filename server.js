const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysql_con = require("./mysql_con");
const con = mysql_con.con;

const hostname = "127.0.0.1";
const port = "3000";

process.argv.forEach(function(item, index) {
    console.log(item, index);
    if(item == "--port") port = Number(process.argv[index + 1]);
})

app.use("/public", express.static("public"));
app.listen(port, hostname, () => {
    console.log(port, hostname);
})

app.get("/", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
})

app.get("/index.html", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
})