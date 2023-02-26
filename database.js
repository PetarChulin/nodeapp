var express = require('express');

var mysql = require('mysql');
const dbConfig = require("./db.config");

var conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,             //your database user
  password: dbConfig.PASSWORD,     //your database password 
  database: dbConfig.DB       //you have to create database in MySQL 'nodeapp' for example
}); 


conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');

  let createUsers = `
    CREATE TABLE  IF NOT EXISTS users (
    id int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email_address varchar(20) NOT NULL UNIQUE,
    login_name varchar(10) NOT NULL UNIQUE,
    real_name varchar(10) NOT NULL,
    password varchar(10) NOT NULL,
    birth_date varchar(20) NOT NULL,
    country varchar(20) NOT NULL
     
  );`

  let createCountries = `
  CREATE TABLE  IF NOT EXISTS countries (
    id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(30) DEFAULT NULL
    );   
   `

    let insertCountries = `
    INSERT IGNORE INTO countries (id, name) VALUES 
    (1, 'Bulgaria'),
       (2, 'Germany'),
       (3, 'USA'),
       (4, 'India');
    `

  conn.query(createUsers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  conn.query(createCountries, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  conn.query(insertCountries, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });



});
conn.promise = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            console.log(sql)
            console.log('ERROR ',err)
          if(err){reject(err);}
          else{resolve(result);}
        });
    });
};
module.exports = conn;