var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
function middleware(req, res, next) {
    jwt.verify(req.query.token,
        'In Kor lies Morz, the frozen throne' +
        'Where lord’s of lakes, have made their home',
        function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    title: 'Not Authenticated!',
                    error: err
                });
            }
            next();
        });
}
module.exports = middleware;