const crypto = require("crypto");

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

var con = null;

router.get('/login', (req, res) => {
    res.render("login");
})

router.post('/login', (req, res) => {
    console.log(req.query.email);
    const email = req.body.email;
    const pw = crypto.createHash("sha256").update(req.body.pw).digest('hex')

    console.log(email, pw);
    req.knex('users').select().where('email', email).then((result) => {
        console.log(result);

        if(result[0] === undefined){
            res.send({
                condition: "fail",
                message: "존재하지 않은 유저입니다."
            });
        }
        else{
            if(result[0].password === pw){
                res.cookie("userEmail", email);
                res.cookie("username", result[0].name);

                res.send({
                    condition: "success",
                    message: "로그인되었습니다."
                })
            }
            else{
                res.send({
                    condition: "fail",
                    message: "비밀번호가 틀렸습니다."
                })
            }
        }
        console.log(`query 성공함`);
    });
})

router.get('/logout', (req, res) => {
    res.cookie("userEmail", "");
    res.redirect('/');
})

router.get('/join', (req, res) => {
    res.render("join");
})

router.post('/join', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pw = crypto.createHash('sha256').update(req.body.pw).digest('hex')
    var phone = req.body.phone;
    console.log(email)
    req.knex('users').select().where('email', email).then((result) => {
        console.log(result);

        if(result[0] === undefined){
            req.knex('users').insert({
              name, email, password: pw, phone
            }).then((result) => {
                console.log(result);
                res.send({
                    condition: "join",
                    message: "회원가입이 완료되었습니다."
                });
            }); 
        }
        else{
            res.send({
                condition: "fail",
                message: "존재하는 아이디 또는 이메일입니다."
            });
        }
        
    });
})

module.exports = router
