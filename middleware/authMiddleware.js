const jwt = require('jsonwebtoken');
const Principal = require('../models/Principal');  // Assuming this is a Mongoose model
require('dotenv').config();

const authToken = (req, res, next) => {
    // Correct the syntax for accessing the header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);  // Unauthorized if no token is found

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) return res.sendStatus(403);  // Forbidden if token verification fails

        req.principal = decodedToken;  // Attach the decoded token payload to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authToken;
