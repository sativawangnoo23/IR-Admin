// Module Requirements
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs');

// Listening Port
const port = 2021

// Express and EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Homepage
app.get('/', function (req, res) {
  res.render('home')
})

// Contacts
app.get('/contacts', function (req, res) {
  res.render('home')
})

// Posts
app.get('/posts', function (req, res) {
  res.render('home')
})

// Subscriptions
app.get('/subscriptions', function (req, res) {
  res.render('home')
})

// Listening Port
app.listen(port,function() {
  console.log("Listening on port")
})
