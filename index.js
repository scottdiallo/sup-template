var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models/user');

var app = express();

var jsonParser = bodyParser.json();

// Add your API endpoints here
app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            return res.sendStatus(500);
        }

        return res.json(users);
    });
});

app.post('/users', jsonParser, function(req, res) {
    var user = new User({
        username: req.body.username
    });
if (req.body.username === "" || !req.body.username )// check to see username is string
{
    return res.status(422).json({
        message: 'Missing field: username'
    });
}
else if (typeof req.body.username !== "string") {
    return res.status(422).json({
        message: 'Incorrect field type: username'
    });
}
    else {
        user.save(function(err, user) {
        if (err) {
            return res.sendStatus(500);
        }

        return res.status(201).location('/users/' + user._id).json({});
    });
    }
});


app.get('/users/:userId', function(req, res) {
    User.findOne({
        _id: req.params.userId
    }, function(err, user) {
        if (err) {
            
            return res.sendStatus(404);
        }

        return res.json(user);
    });
});

var databaseUri = global.databaseUri || 'mongodb://localhost/sup';
mongoose.connect(databaseUri).then(function() {
    app.listen(8080, function() {
        console.log('Listening on localhost:8080');
    });
});

module.exports = app;
