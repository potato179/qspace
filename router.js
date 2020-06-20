const express = require('express')
const router = express.Router()

router.use("/public", express.static("public"))
router.get("/", (req, res) => {
    res.render("index")
})

router.get("/community", (req, res) => {
    res.render("community")
});

router.get("/codingquiz", (req, res) => {
  res.render("codingtest")
})

module.exports = router
