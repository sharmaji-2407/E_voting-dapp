const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');




const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '2407',
    database: 'ev_dapp_user_reg',
    insecureAuth : true,
});



app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.post('/api/login', (req,res) => {
    const voterId = req.body.voterId;
    const voterPassword = req.body.voterPassword;

    const sqlSelect = "SELECT * FROM voter_info WHERE voterId = ? AND voterPassword = ?";
    db.query(sqlSelect, [voterId, voterPassword], (err,result) => {
        
        if(err){
            res.send({err:err});
        }

        if(result.length > 0)
        {
            delete result[0].voterPassword;
            res.send(result[0]);
            
        }
        else{
            res.send({message : "Invalid voterId or Password."});
        }
    });
})




app.post("/api/register", (req, res)=>{
                    

    const voterId = req.body.voterId;
    const voterPassword = req.body.voterPassword;
    const voterName = req.body.voterName;

    db.query(
    "INSERT INTO voter_info(voterId,voterName,voterPassword) VALUES (?,?,?)", 
    [voterId,voterName,voterPassword],
    (err,result)=>{
        console.log(result);
    }
    );
});





app.listen(3001, () => {
    console.log("Server running on 3001");
})