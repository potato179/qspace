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
  res.status(404).send('codingquiz는 아직 읎어요!')
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

        if(result[0] === undefined) res.send("<script>alert('존재하지 않는 유저입니다.'); window.location.href = '/login'</script>")
        else {
            if(result[0].password === pw) {
              // TODO Session
              /*
              res.cookie("userEmail", email);
              res.cookie("username", result[0].name);
              */
              req.session.userEmail = email
              req.session.username = result[0].name

                res.redirect('/')
            }
            else res.send("<script>alert('비밀번호가 맞지 않습니다.'); window.location.href = '/login'</script>")
        }
        console.log(`query 성공함`);
    });
})

router.get('/logout', (req, res) => {
    req.session.userEmail = null
    req.session.username = null
    res.redirect('/');
})

router.get('/join', (req, res) => {
    res.render("join");
})

router.post('/join', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pw = crypto.createHash('sha256').update(req.body.pw).digest('hex')
    console.log(email)
    req.knex('users').select().where('email', email).then((result) => {
        console.log(result);

        if(result[0] === undefined){
            req.knex('users').insert({
              name, email, password: pw
            }).then((result) => {
                console.log(result);
                res.send("<script>alert('회원가입이 완료되었습니다.'); window.location.href = '/'</script>");
            }); 
        }
        else res.send("<script>alert('이미 존재하는 아이디 또는 이메일입니다.'); window.location.href = '/join'</script>")
    });
})

module.exports = router
