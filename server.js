const http = require("http");
const express = require("express");
const fs = require("fs");

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const router = require('./router')

const settings = require('./settings.json')

const knex = require('knex')(settings.db)

const hostname = "127.0.0.1";
const port = "3000";

app.use(express.urlencoded())

app.use((req, res, next) => {
  req.knex = knex
  next()
})

process.argv.forEach((item, index) => {
    console.log(item, index);
    if(item === "--port") port = Number(process.argv[index + 1])
})

app.use(router)

app.listen(port, hostname, () => {
    console.log('Listening on ' + hostname + ':' + port);
})
