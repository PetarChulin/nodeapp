var express = require("express");

var mysql = require("mysql");
const dbConfig = require("./db.config");

var conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER, //your database user
  password: dbConfig.PASSWORD, //your database password
  // database: dbConfig.DB       //you have to create database in MySQL 'nodeapp' for example
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let databaseName = "nodeapp";

  let useQuery = `USE ${databaseName}`;

  let checkForExistence = `SHOW DATABASES LIKE '${databaseName}'`;

  let createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

  let existed = false;

  conn.query(checkForExistence, function (err, res) {

    let result = JSON.parse(JSON.stringify(res));
    if (err) throw err;
    if (result.length == 0) {
      console.log("Database created successfully!");
      existed = true;
    }
  });

  conn.query(createQuery, function (err, res) {
    if (err) throw err;
   
  });


  conn.query(useQuery, () => {
    if (err) throw err;
    console.log("Using Database");
  });

  let createUsers = `
    CREATE TABLE  IF NOT EXISTS users (
    id int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email_address varchar(20) NOT NULL UNIQUE,
    login_name varchar(10) NOT NULL UNIQUE,
    real_name varchar(10) NOT NULL,
    password varchar(10) NOT NULL,
    birth_date varchar(20) NOT NULL,
    country varchar(20) NOT NULL
     
  );`;

  let createCountries = `
  CREATE TABLE  IF NOT EXISTS continents (
    id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(30) DEFAULT NULL
    );   
   `;

  let insertCountries = `
    INSERT IGNORE INTO continents (id, name) VALUES 
    (1, 'Africa'),
    (2, 'Asia'),
    (3, 'Australia/Oceania'),
       (4, 'Europe'),
       (5, 'North America'),
       (6, 'South America');
    `;

  conn.query(createUsers, function (err) {
    if (err) {
      console.log(err.message);
    }
  });

  conn.query(createCountries, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  conn.query(insertCountries, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
});
conn.promise = (sql) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      console.log(sql);
      console.log("ERROR ", err);
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = conn;
