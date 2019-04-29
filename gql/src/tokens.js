const request = require("request");
const secret = "mysecret";

module.exports = {
    sign: function(id) {
        return new Promise(function(resolve, reject) {
            request.post("http://localhost:3001/generate", {json: {buyerID: id}}, function(err, res, body) {
                if (err || !body) reject(err.toString());
                resolve(body.token);
            });
        });
    },
    verify: function(token) {
        return new Promise(function(resolve, reject) {
            request.post("http://localhost:3001/verify", {json: {token}}, function(err, res, body) {
                if (err || !body) reject(err.toString());
                resolve(body.buyerID);
            });
        });
    },
}