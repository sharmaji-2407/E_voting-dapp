const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2407',
    database: 'ev_dapp_user_reg',
    insecureAuth : true,
});




app.listen(3001, () => {
    console.log("Server running on 3001");
})