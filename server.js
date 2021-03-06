const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const PORT = process.env.PORT || 3001;
const app = express();

mongoose.Promise = bluebird;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets if in production (running on Heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static(__dirname + "/public"));
}
// Use Routes
app.use("/", routes);

// Connect mongoose to our database

const db = process.env.MONGODB_URI || "mongodb://localhost/mondegreen";
mongoose.connect(db, function(error) {
    // Log any errors connecting with mongoose
    if (error) {
        console.error(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});