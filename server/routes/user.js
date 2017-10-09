var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../../models/user');

// post route creates user
router.post('/', function (req, res, next) {
    var user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password,10),
        schoolName : req.body.schoolName
    });
    user.save(function(err,result){
        if (err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

module.exports = router;