const graphql_tools = require("graphql-tools");
var tokens = require("./tokens");

var Product = require("./product.model");
var Buyer = require("./buyer.model");
var Order = require("./order.model");

var typeDefs = `
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
        buyer: Buyer,
        product: Product,
        timestamp: String
    }
`;

var resolvers = {
    Query: {
        getProducts: function() {
            return Product.find().exec();
        },
        getBuyers: function() {
            return Buyer.find().exec();
        },
        getOrders: function() {
            return Order.find().exec();
        },
        getBuyerOrders: function(root, args, context) {
            var token = context.headers.authorization;
            if (token) {
                token = token.substring(4);
                return tokens.verify(token).then(function(buyerID) {
                    if (buyerID && args.buyerID == buyerID) {
                        return Order.find({buyer: buyerID}).exec();
                    } else {
                        throw new Error("Wrong authorization token");
                    }
                });
            } else {
                throw new Error("Not authorized");
            }
        },
    },
    Mutation: {
        createProduct: function(root, args) {
            var p = new Product({productName: args.productName});
            p.save();
            return p;
        },
        createBuyer: function(root, args) {
            var b = new Buyer({buyerName: args.buyerName});
            return tokens.sign(b.id).then(function(token) {
                b.buyerAuthToken = token;
                b.save();
                return b;
            });
        },
        createOrder: function(root, args) {
            var o = new Order({
                buyer: args.buyerID,
                product: args.productID,
            });
            o.save();
            return o;
        }
    },
    Order: {
        buyer: function(order) {
            return Buyer.findById(order.buyer).exec();
        },
        product: function(order) {
            return Product.findById(order.product).exec();
        }
    }
};

module.exports = graphql_tools.makeExecutableSchema({typeDefs, resolvers});