const express = require('express')
const catMe = require("cat-me");
const app = express()
const bodyParser = require("body-parser");
const path = require("path");

require('dotenv').config()
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI

app.use('/public', express.static(path.join(__dirname, 'static')))
app.set('view engine', 'ejs');

mongoose.connect(uri, {
//    dbname: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(error) {
    if(error) {
      console.log("Error connecting to mongo [%o]", error);
    }
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB atlas connected");
})

var gameSchema = new mongoose.Schema({
 title: String
});

var Game = mongoose.model("Game", gameSchema);

Game.create({
  title: "learn to fly3"
}, function(error, data) {
  if(error) {
    console.log("error [%o]", error);
  } else {
    console.log("data [%o]", data);
  }
})

// Game.find({}, function(error, data) {
//   if(error) {
//     console.log("error finding game [%o]", error);
//   } else {
//     console.log("data game find [%o]", data);
//   }
// })

app.get("/list", function(req, res) {
  Game.find({}, function(error, games) {
    if(error) {
      console.log("error [%o]", error);
    } else {
      res.render("list", {
        gamesList: games
      });
    }
  });
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

console.log(catMe());

app.get('/', (req, res) => {
  res.send('send');
});

module.exports = app;
