const jsonwebtoken = require('jsonwebtoken');

const secret = 'lihongyang';
const JWT = {
    generate(value, expiresIn) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expiresIn });
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret);
        } catch (error) {
            return false;
        }
    },
};

module.exports = JWT;
