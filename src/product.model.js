const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Product", productSchema);