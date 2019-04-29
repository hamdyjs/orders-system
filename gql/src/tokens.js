const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
    sign: function(payload) {
        var err, token = jwt.sign(payload, secret);
        return err, token;
    },
    verify: function(token) {
        try {
            var payload = jwt.verify(token, secret);
            return payload;
        } catch(err) {
            return null;
        }
    },
}