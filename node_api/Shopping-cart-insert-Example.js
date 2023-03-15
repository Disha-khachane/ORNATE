
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql2');

const jsonParser = bodyParser.json();
const cors = require('cors');


app.use(cors());


app.post('/insert', jsonParser, (req, res) => {
    console.log(req.body);
    //res.render('Home');
    insertData(req.body.item, req.body.quantity, req.body.price, req.body.username, req.body.emailid, req.body.phonenum, req.body.state, req.body.pincode, req.body.address);
    res.end();
})

app.listen(4000);


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'd_k@30102001',
    database: 'shopping_cart'
});

function insertData(item, quantity, price, username, emailid, phonenum, state, pincode, address){

    var sqlSP = "call insert_cart_value(?,?,?,?,?,?,?,?,?)";
conn.connect((err) => {
    if(err) throw err;
    conn.query(sqlSP, [item, quantity, price, username, emailid, phonenum, state, pincode, address], (err, res, fields) => {
        if(err) throw err;
        console.log(res);
    });
});
}