const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysql_con = require("./mysql_con");
const con = mysql_con.con;

const ps_users = require("./ps_users.js");

const hostname = "127.0.0.1";
const port = "3000";

var urls = [
    {url: "/login", ps: ps_users.login},
    {url: "/login.html", ps: ps_users.login_html},
    {url: "/logout", ps: ps_users.logout},
    {url: "/join", ps: ps_users.join},
    {url: "/join.html", ps: ps_users.join_html}
];

process.argv.forEach(function(item, index) {
    console.log(item, index);
    if(item == "--port") port = Number(process.argv[index + 1]);
});

app.use("/public", express.static("public"));
app.listen(port, hostname, () => {
    console.log(port, hostname);
});

app.get("/", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

app.get("/index.html", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

app.get("/community.html", function(req, res, next){
    res.sendfile("community.html", {root: __dirname});
});

app.get("/codingquiz.html", function(req, res, next){
    res.sendfile("codingtest.html", {root: __dirname});
})


urls.forEach(function(element, index){
    app.get(element.url, element.ps);
});