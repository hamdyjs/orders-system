const graphql = require("graphql");

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

module.exports = {schema};