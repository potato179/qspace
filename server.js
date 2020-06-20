const http = require("http");
const express = require("express");
const fs = require("fs");

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const router = require('./router')

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

process.argv.forEach((item, index) => {
    console.log(item, index);
    if(item === "--port") port = Number(process.argv[index + 1])
})

urls.forEach((element, index) => {
    app.get(element.url, element.ps)
})

app.use(router)

app.listen(port, hostname, () => {
    console.log('Listening on ' + hostname + ':' + port);
})
