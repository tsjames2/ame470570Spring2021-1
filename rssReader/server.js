var Client = require('node-rest-client').Client;
var client = new Client();
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var rssList = [];

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

app.get("/getFeedData", function (req, res) {
  var feed = req.query.feed;
  client.get(feed, function (data, response) {
    res.send(data);
  });
});

app.get("/getFeeds", function (req, res) {
    res.send(JSON.stringify(rssList));
});

app.get("/deleteFeed", function (req, res) {
  var index = parseInt(req.query.feedno);
  rssList.splice(index, 1);
  res.send(JSON.stringify(rssList));
});


app.get("/editFeed", function (req, res) {
  var index = parseInt(req.query.feedno);
  var newname  = req.query.newname;
  rssList[index].name = newname;
  res.send(JSON.stringify(rssList));
});

app.get("/addFeed", function (req, res) {
  var feed = req.query.feed;
  var name = req.query.name;
  var obj = {
    name: name,
    feed: feed,
    time: new Date().getTime()
  }
  rssList.push(obj);
  res.send(JSON.stringify(rssList));
});





app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
