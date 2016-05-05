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

var bcrypt = require('bcrypt');

var User = require('./models/user');
var Message = require('./models/message');

var app = express();

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }
        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });

    });
});
passport.use(strategy); //telling passport to use strategy 12-38

// Add your API endpoints here
app.get('/users',
passport.authenticate('basic', {
    session: false
}),
function(req, res) {
    });
});

passport.use(strategy);

app.use(passport.initialize());

var jsonParser = bodyParser.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/users', passport.authenticate('basic', { session: false }), function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });
});

app.post('/users', jsonParser, function(req, res) {
app.post('/users', function(req, res) {
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

    var username = req.body.username;

    if (typeof username !== 'string') {
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

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash

            });
            user.save().then(function(user) {
                res.location('/users/' + user._id).status(201).json(user);
            }).catch(function(err) {
                res.status(500).send({
                    message: 'Internal server error'
                });
            });
        });
    });
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

app.put('/users/:userId', jsonParser, function(req, res) {
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
        _id: req.params.userId,
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
app.delete('/users/:userId', passport.authenticate('basic', { session: false }), function(req, res) {
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

app.post('/messages', jsonParser, function(req, res) {
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

    var message = new Message({
        from: req.body.from,
        to: req.body.to,
        text: req.body.text
    });

    var findFrom = User.findOne({
        _id: message.from
    });
    var findTo = User.findOne({
        _id: message.to
    });

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
        } else if (!results[1]) {
            res.status(422).json({
                message: 'Incorrect field value: to'
            });
        } else {
            return message.save();
        }
    }).then(function(user) {
        res.location('/messages/' + message._id).status(201).json({});
    }).catch(function(err) {
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
            res.status(500).send({
                message: 'Internal server error'
            });
        });
});

app.use(passport.initialize());

app.get('/hidden', passport.authenticate('basic', {
    session: false
}), function(req, res) {
    res.json({
        message: 'Luke...I am your father' //may the force be with you "scott"
    });
});


var databaseUri = global.databaseUri || 'mongodb://localhost/sup';
mongoose.connect(databaseUri).then(function() {
    app.listen(8080, function() {
        console.log('Listening on localhost:8080');
    });
});

module.exports = app;
