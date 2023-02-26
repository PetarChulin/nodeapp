var express = require('express');

var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',             //your database user
  password: '12345678',     //your database password 

  
  


}); 

conn.connect(function(err) {  
    if (err) throw err;  
    console.log("Connected!");  
    conn.query("CREATE DATABASE IF NOT EXIST nodeapp", function (err, result) {  
    if (err) throw err;  
    console.log("Database created");  
    });  

});

module.exports = conn;



