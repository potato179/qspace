const http = require("http");
const express = require("express");
const fs = require("fs");
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const router = require('./router')

const settings = require('./settings.json')

app.use(session({
  //cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 }),
  secret: settings.secret || ('설정에서 고유 값을 설정해 주세요' + Math.random()),
  resave: false,
  saveUninitialized: false,
  name: 'cookie.name'
}))

const knex = require('knex')(settings.db)

const hostname = "127.0.0.1";
const port = "3000";

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  req.knex = knex
  next()
})

process.argv.forEach((item, index) => {
    console.log(item, index);
    if(item === "--port") port = Number(process.argv[index + 1])
})

app.use(router)

app.listen(port, () => {
    console.log('Listening on ' + hostname + ':' + port);
})
