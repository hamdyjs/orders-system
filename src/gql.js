const graphql = require("graphql");

var Product = require("./product.model");
var Buyer = require("./buyer.model");
var Order = require("./order.model");

var schema = graphql.buildSchema(`
    type Query {
        getProducts: [Product!],
        getBuyers: [Buyer!],
        getOrders: [Order!],
        getOrder: Order
    },
    type Mutation {
        createProduct(name: String!) : Product,
        createBuyer(name: String!) : Buyer,
        createOrder(buyerId: String!, productId: String!) : Order
    },
    type Product {
        id: String,
        name: String
    },
    type Buyer {
        id: String,
        name: String
    },
    type Order {
        id: String,
        buyer: String,
        product: String,
        timestamp: String
    }
`);

var root = {
    getProducts: function() {
        return Product.find().exec();
    },
    getBuyers: function() {
        return Buyer.find().exec();
    },
    getOrders: function() {
        return Order.find().exec();
    },
    getOrder: function(args) {
        return null;
    },
    createProduct: function(args) {
        var p = new Product({name: args.name});
        p.save();
        return p;
    },
    createBuyer: function(args) {
        var b = new Buyer({name: args.name});
        b.save();
        return b;
    },
    createOrder: function(args) {
        var o = new Order({
            buyer: args.buyerId,
            product: args.productId,
        });
        o.save();
        return o;
    }
};

module.exports = {schema, root};