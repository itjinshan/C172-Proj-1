const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const authRoutes = require('./routes/auth-routers');
const FacebookStrategy = require("passport-facebook");
const cors = require('cors');
const keys = require('./config');

let user = {};

passport.serializeUser((user, cb) => {
  cb(bull, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: keys.FACEBOOK.clientID,
  clientSecret: keys.FACEBOOK.clientSecret,
  callbackUrl: "auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) =>  {
    console.log(JSON.stringify(profile));
    user = { ...profile};
    return cb(null, profile);
  }));

var app = express();

app.use(cors());
app.use(passport.initialize());

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
  passport.authenticate(("facebook"),
  (req, res) => {
    res.redirect("/");
  }));

// Home Route
app.get('/', (req, res) => {
  res.render('app');
});

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// User Auth
app.use('/auth', authRoutes);

var port = process.env.PORT || 5000,
    http = require('http'),
    fs = require('fs');

app = http.createServer(function (req, res) {
  if (req.url.indexOf('/img') != -1) {
    var filePath = req.url.split('/img')[1];
    fs.readFile(__dirname + '/public/img' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(data);
      }  
      res.end();
    });
  } else if (req.url.indexOf('/js') != -1) {
    var filePath = req.url.split('/js')[1];
    fs.readFile(__dirname + '/public/js' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
      }  
      res.end();
    });
  } else if(req.url.indexOf('/css') != -1) {
    var filePath = req.url.split('/css')[1];
    fs.readFile(__dirname + '/public/css' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
      }
      res.end();
    });
  } else {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
      }
      res.end();
    });
  }
}).listen(port, '0.0.0.0');


module.exports = app;