var  express = require('express');
var router = express.Router();
var path = require('path');

router.post('/login', function(req, res){
    

});


postLoginRoute.post(function (req, res) {
    var response = {};
    if (req.body.email == null || req.body.email === undefined || req.body.password === undefined || req.body.password == null) {
        response.code = 300;
        response.data = null;
        response.message = "Fields cannot be null";
        return res.json(response);

    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            response.code = 300;
            response.data = err;
            response.message = "Mongoose Query Error";
            res.json(response);
            return;
        } else {
            if (user == null || user === undefined) {
                response.code = 300;
                response.data = null;
                response.message = "User not found";
                res.json(response);
                return;
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    response.code = 200;5
                    response.data = {
                        name: user.name,
                        email: user.email,
                        walletAddress: user.receiverEthAddress,
                        receiverBtcAddress : user.receiverBtcAddress,
                        _id: user._id,
                        token: jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        }, secretKeys.jwtSecret)
                    };
                    response.message = "Success";
                    res.json(response);
                    return;
                } else {
                    response.code = 300;
                    response.data = null;
                    response.message = "Incorrect Password";
                    res.json(response);
                    return;
                }
            }
        }
    });
});



module.exports = router;