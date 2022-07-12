const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const moviesRoute = require("./routes/movies.route");
var path = require('path')

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/*', (req, res, next) => {
  console.log("in route ", req.baseUrl)
  next();
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", moviesRoute);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
