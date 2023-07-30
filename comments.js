//create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();
var port = 8080;
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//connect to mongoDB
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//create collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //create collection
  dbo.createCollection("comments", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

//insert data
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //create object
  var myobj = { name: "Company Inc", address: "Highway 37" };
  //insert object into collection
  dbo.collection("comments").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});