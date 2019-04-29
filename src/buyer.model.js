const mongoose = require("mongoose");

var buyerSchema = mongoose.Schema({
    buyerName: {
        type: String,
        required: true,
    },
    buyerAuthToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Buyer", buyerSchema);