const graphql = require("graphql");
var tokens = require("./tokens");

var Product = require("./product.model");
var Buyer = require("./buyer.model");
var Order = require("./order.model");

var schema = graphql.buildSchema(`
    type Query {
        getProducts: [Product!],
        getBuyers: [Buyer!],
        getOrders: [Order!],
        getBuyerOrders(buyerID: String!): [Order]
    },
    type Mutation {
        createProduct(productName: String!) : Product,
        createBuyer(buyerName: String!) : Buyer,
        createOrder(buyerID: String!, productID: String!) : Order
    },
    type Product {
        id: String,
        productName: String
    },
    type Buyer {
        id: String,
        buyerName: String,
        buyerAuthToken: String,
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
    getBuyerOrders: function(args, context) {
        var token = context.headers.authorization;
        if (token) {
            token = token.substring(4);
            var payload = tokens.verify(token);
            if (payload && args.buyerID == payload.id) {
                return Order.find({buyer: args.buyerID}).exec();
            } else {
                throw new Error("Wrong authorization token");
            }
        } else {
            throw new Error("Not authorized");
        }
    },
    createProduct: function(args) {
        var p = new Product({productName: args.productName});
        p.save();
        return p;
    },
    createBuyer: function(args) {
        var b = new Buyer({buyerName: args.buyerName});
        var token = tokens.sign({id: b.id});
        b.buyerAuthToken = token;
        b.save();
        return b;
    },
    createOrder: function(args) {
        var o = new Order({
            buyer: args.buyerID,
            product: args.productID,
        });
        o.save();
        return o;
    }
};

module.exports = {schema, root};