const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2407',
    database: 'ev_dapp_user_reg',
    insecureAuth : true,
});

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM voter_info";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    })
})


app.post("/api/insert", (req, res)=>{

    
    const voterId = req.body.voterId
    const voterName = req.body.voterName
    const voterAadhar = req.body.voterAadhar

    const sqlInsert = "INSERT INTO voter_info(voterId,voterName,voterAadhar) VALUES (?,?,?)"
    db.query(sqlInsert, [voterId,voterName,voterAadhar],(err,result)=>{
        console.log(result);
    });
});



app.listen(3001, () => {
    console.log("Server running on 3001");
})