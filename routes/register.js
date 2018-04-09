var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/User');
var bcrypt = require('bcrypt');


router.post('/register', function (req, res) {
    var response = {};

    var userName = req.body.userName;
    var Email = req.body.Email;
    var Password = req.body.Password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(Password, salt)

    if (!Email && !userName && !Password) {
        response.code = 300;
        response.data = null;
        response.message = "Fields cannot be null";
        res.json(response);
        return;
    }


    User.findOne({ username: userName, email: Email }, function (err, data) {
        if (data != null || data != undefined) {
            response.message = "Already Account exist";
            response.code = 300;
            response.data = null;

            res.json(response);
            return;
        } else if (data == null || data === undefined) {
            var newUser = new User();
            newUser.username = userName;
            newUser.email = Email;
            newUser.password = hash;
            
            newUser.save();
            response.message = "User Successfuly Registered";
            response.code = 200;
            response.data = newUser;
            res.json(response);
            return;
        }
    });

});


module.exports = router;