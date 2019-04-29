const mongoose = require("mongoose");

var buyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Buyer", buyerSchema);