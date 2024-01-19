const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            const data = {
                message: "Unauthorized",
            }
            return res.status(401).json(data)
        }
        const token = header.split(' ')[1];

        if (!token) {
            const data = {
                message: "Token tidak ada",
            }
            return res.status(401).json(data)
        }

        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();

    } catch (err) {
        const data = {
            message: "Token tidak valid",
        }
        return res.status(401).json(data)
    }
}

module.exports = auth;