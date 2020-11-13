const http  = require('http');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
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

app.get('/users',function(req,res){
    let sql = 'SELECT * FROM userform';
    con.query(sql,function(err,data){
        if(err){
            throw err;
        }else{
            res.send(data);
            res.end();
        }
    });

});

app.get('/users/:id',function(req,res){
    let sql = `SELECT * FROM userform where id =${req.params.id}`;
    con.query(sql,function(err,data){
        if(err){
            throw err;
        }else{
            res.send(data);
            res.end();
        }
    });

});

app.post('/users/update/:id',function(req,res){

    let sql = `UPDATE userform SET name = '${req.body.username}' , email= '${req.body.email}' WHERE id = ${req.params.id}`;
    con.query(sql,function(err,data){
        if(err){
            throw err;
        }else{
            res.send(data);
            res.end();
        }
    });

});

app.delete('/users/delete/:id',function(req,res){
    let sql = 'DELETE FROM userform where id = ?';
    con.query(sql,[req.params.id],function(err,data){
        if(err){
            throw err;
        }else{
            res.send(data);
            res.end();
        }
    });

});



app.post('/users/add',function(req,res){
    var sql = "INSERT INTO userform SET ?";
    const data = {
        name:req.body.username,
        email:req.body.email
    }
    con.query(sql,[data],function(err,data){
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

