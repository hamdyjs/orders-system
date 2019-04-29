const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const secret = "mysecret";

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/generate", function(req, res) {
    var buyerID = req.body.buyerID;
    var err, token = jwt.sign({buyerID}, secret);
    console.log(buyerID, token);
    if (err) res.status(200).end();
    else res.status(200).send(token);
});

app.post("/verify", function(req, res) {
    var token = req.body.token;
    var payload = jwt.verify(token, secret);
    console.log(token, payload.buyerID);
    if (payload) res.status(200).send(payload.buyerID);
    else res.status(200).end();
});

app.listen(3001, function() {
    console.log("Started listening on :3001")
});