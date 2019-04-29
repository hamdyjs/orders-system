const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Product", productSchema);