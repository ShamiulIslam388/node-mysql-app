const http  = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'testdb'
});

con.connect(function(err){
    if(err) throw err;
    console.log('database connected');
})

app.get('/user/postdata',function(req,res){
    let sql = 'INSERT INTO userform (name,email) VALUES(?,?)';
    con.query(sql,[req.params.name,req.params.email],function(err,data){
        if(err){
            throw err;
        }else{
            res.send(data);
            res.end();
        }
    });

});

app.listen(5000,function(){
    console.log('Listening port no 5000');
})

