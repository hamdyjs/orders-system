const express = require("express");
const express_graphql = require("express-graphql");

var db = require("./src/database");
var gql = require("./src/gql.js");

var app = express();

app.use("/graphql", express_graphql({
    schema: gql.schema,
    rootValue: gql.root,
    graphiql: true,
}));

app.listen(3000, function() {
    console.log("Started listening on :3000");
});