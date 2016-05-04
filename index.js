var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Message = require('./models/message');
var bcrypt = require('bcrypt');
var User = require('./models/user');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var app = express();
var jsonParser = bodyParser.json();
app.use(passport.initialize());

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({ // check user in db to see if it exist
        username: username
    }, function(err, user){
        if(err){
            callback(err);
            return;
        }
        if(!user){ // if user do not exist then return is called
            return callback(null, false,{
                message: 'Incorrect username'
            });
        }
        user.validatePassword(password, function(err, isValid){
            if (err) {
                callback(err);
            }
            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password'
                });
            }
            return callback(null, user);
        });

    });
});
passport.use(strategy); //telling passport to use strategy 12-38
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
// Add your API endpoints here
app.get('/users',
passport.authenticate('basic', {
    session: false
}),
function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });
});

app.post('/users', jsonParser, function(req, res) {

    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    if (typeof req.body.username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }
    var password = req.body.password;
bcrypt.genSalt(12, function(err, salt){ // salt the password
    if (err){
        return res.status(500).json({
            message:"Internal server error"
        });
    }
    bcrypt.hash(password, salt,function(err, hash){ //hash password
        if (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        var user = new User({ // user created
            username: req.body.username,
            password: hash // equal hash because passcode is hash now
        });
        user.save(function(err){// saving user in database
            if(err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            return res.location('/users/' + user._id).status(201).json({});
        });
    });
});
    // var user = new User({
    //     username: req.body.username
    // });
    //
    // user.save().then(function(user) {
    //     res.location('/users/' + user._id).status(201).json({});
    // }).catch(function(err) {
    //     console.log(err);
    //     res.status(500).send({
    //         message: 'Internal server error'
    //     });
    // });
});

app.get('/users/:userId', function(req, res) {
    User.findOne({
        _id: req.params.userId
    }).then(function(user) {
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        res.json(user);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});

app.put('/users/:userId', jsonParser,passport.authenticate('basic', {
    session: false
}), function(req, res) {

    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    if (typeof req.body.username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    User.findOneAndUpdate({
        _id: req.params.userId
    }, {
        username: req.body.username
    }, {
        upsert: true
    }).then(function(user) {
        res.status(200).json({});
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});

app.delete('/users/:userId',
passport.authenticate('basic', { // authenticating delete
    session: false
}),
function(req, res) {
    User.findOneAndRemove({
        _id: req.params.userId
    }).then(function(user) {
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        res.status(200).json({});
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error'
        });
    });

});

app.get('/messages', function(req, res) {
    var filter = {};
    if ('to' in req.query) {
        filter.to = req.query.to;
    }
    if ('from' in req.query) {
        filter.from = req.query.from;
    }
    Message.find(filter)
        .populate('from')
        .populate('to')
        .then(function(messages) {
            res.json(messages);
        });
});

app.post('/messages', function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('text' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: text'
        });
    }

    if (typeof req.body.text !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: text'
        });
    }

    if (!('to' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: to'
        });
    }

    if (typeof req.body.to !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: to'
        });
    }

    if (!('from' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: from'
        });
    }

    if (typeof req.body.from !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: from'
        });
    }
    // console.log("From: ", req.body.from);
    // console.log("To: ", req.body.to);
    // console.log("Text: ", req.body.text);
    var message = new Message({
        from: req.body.from,
        to: req.body.to,
        text: req.body.text
    });

    var findFrom = User.findOne({
        _id: message.from
    });
    // console.log('findFrom: ', message.from);
    var findTo = User.findOne({
        _id: message.to
    });
    // console.log('findTo: ', message.to);

    return Promise.all([findFrom, findTo]).then(function(results) {
        if (!results[0]) {
            res.status(422).json({
                message: 'Incorrect field value: from'
            });
            return null;
        }
        else if (!results[1]) {
            res.status(422).json({
                message: 'Incorrect field value: to'
            });
            return null;
        }
        else {
            return message.save();
        }
    }).then(function(user) {
        if (!user) {
            // Incorrect field values - handled above.
            return;
        }
        res.location('/messages/' + message._id).status(201).json({});
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});

app.get('/messages/:messageId', function(req, res) {
    Message.findOne({
        _id: req.params.messageId
    })
    .populate('from')
    .populate('to')
    .then(function(message) {
        if (!message) {
            res.status(404).json({
                message: 'Message not found'
            });
            return;
        }
        res.json(message);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});

var databaseUri = global.databaseUri || 'mongodb://localhost/sup';
mongoose.connect(databaseUri).then(function () {
    app.listen(8080, function () {
        console.log('Listening on localhost:8080');


    });
});

module.exports = app;
