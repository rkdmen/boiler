const Server = require("./server.js");
const port = process.env.PORT || 3000;
const app = Server.app();
const http = require("http"); // For serving a basic web page.
const mongoose = require("mongoose"); // The reason for this demo.
const express = require("express");
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
let now = new Date();
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://heroku_ghww80dp:b73idpsb2psqrf5ipqnnkh660m@ds021771.mlab.com:21771/heroku_ghww80dp";

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log("ERROR connecting to: " + uristring + ". " + err);
  } else {
    console.log("Succeeded connected to: " + uristring);
  }
});

let userSchema = new mongoose.Schema({
  userName: String,
  savedMovie: Array
});

let user = mongoose.model("User", userSchema);

app.get("/api/movie", (req, res) => {
  user.find({}).exec(function(err, result) {
    if (!err) {
      // handle result
      console.log(result, " is my result!");
      //res.send....
      res.send(result);
    } else {
      // error handling
      if (err) console.log("Error on get!");
    }
  });
});

app.post("/api/movie", (req, res) => {
  user
    .update({ $push: { savedMovie: req.body } })
    .then(res.status(201).send(req.data));
});

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("./webpack.config.js");
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
}

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
