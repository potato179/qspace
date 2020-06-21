const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "potato179",
    password: "1234",
    database: "qspace"
})

con.connect(function(error){
    if(error) throw error;
    console.log(`[준비완료] mysql 연결을 완료했습니다.`);
})

exports.con = con;