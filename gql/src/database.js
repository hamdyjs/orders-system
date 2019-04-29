const mongoose = require("mongoose");

class Database {
    constructor() {
        mongoose.connect(
            "mongodb+srv://dbuser:S11dlOtT7lecU5XY@cluster0-fswyq.mongodb.net/test?retryWrites=true",
            {useNewUrlParser: true}
        ).then(function() {
            console.log("Connected to database successfully");
        }).catch(function(err) {
            console.log("Error connecting to database");
        });
    }
}

module.exports = new Database();