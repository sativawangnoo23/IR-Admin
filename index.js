// Module Requirements
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose');
const moment = require('moment');

// MongoDB
const mongopassword = "8W2VVkHiyvuTVOuG"
const dbUrl = "mongodb+srv://admin-user:" + mongopassword + "@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contactSchema = {
  name: String,
  email: String,
  date: String,
  organization: String,
  designation: String,
  subject: String,
  message: String
}
const Contact = mongoose.model('Contact', contactSchema)
const subscriberSchema = {
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      }
    },
    required: true
  }
}
const Subscriber = mongoose.model('Subscriber', subscriberSchema)
const postSchema = {
  id: Number,
  title: String,
  author: String,
  email: String,
  date: String,
  text: String,
  other: String,
  visibility: {
    type: Boolean,
    default: false
  }
};

const Post = mongoose.model('Post', postSchema);

// Listening Port
const port = 2021

// Express and EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Homepage
app.get('/', function(req, res) {
  res.render('home')
})

// Contacts
app.get('/contacts', function(req, res) {
  Contact.find({},null,{sort:{date:-1}}, function(err, contacts) {
    res.render("contacts",{ contacts:contacts});
  });
})

// Posts
app.get('/posts', function(req, res) {
  res.render('home')
})

// Subscriptions
app.get('/subscriptions', function(req, res) {
  Subscriber.find({}, (err, mails) => {
    var csvContent = '';
    mails.forEach(function(mail) {
      csvContent += mail.email + '; '
    });
    res.render('subscriptions', {
      csvContent:csvContent
    })
  })
})

// Listening Port
app.listen(port, function() {
  console.log("Listening on port")
})
