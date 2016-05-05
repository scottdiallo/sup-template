global.databaseUri = 'mongodb://localhost/sup-dev';

var chai = require('chai');
var chaiHttp = require('chai-http');
var spies = require('chai-spies');
var mongoose = require('mongoose');
var UrlPattern = require('url-pattern');
<<<<<<< HEAD
=======
var shared = require('./shared');
>>>>>>> collab-branch
var app = require('../index');

var should = chai.should();

chai.use(chaiHttp);
chai.use(spies);

describe('User endpoints', function() {
    beforeEach(function() {
        mongoose.connection.db.dropDatabase();
<<<<<<< HEAD
=======
        var user = {
            username: 'joe',
            password: 'abc123',
            _id: 'AAAAAAAAAAAAAAAAAAAAAAAA'
        };
        var promiseA = chai.request(app)
            .post('/users')
            .send(user);
        return Promise.all([promiseA]);
>>>>>>> collab-branch
    });
    describe('/users', function() {
        beforeEach(function() {
            this.pattern = new UrlPattern('/users');
        });

        describe('GET', function() {
<<<<<<< HEAD
        //     it('should return an empty list of users initially', function() {
        //         return chai.request(app)
        //             .get(this.pattern.stringify())
        //             .then(function(res) {
        //                 res.should.have.status(200);
        //                 res.type.should.equal('application/json');
        //                 res.charset.should.equal('utf-8');
        //                 res.body.should.be.an('array');
        //                 res.body.length.should.equal(0);
        //             });
        //     });
=======

>>>>>>> collab-branch

            it('should return a list of users', function() {
                var user = {
                    username: 'joe',
<<<<<<< HEAD
                    password: 'string'
=======
                    password: 'bye'
>>>>>>> collab-branch
                };
                return chai.request(app)
                    .post(this.pattern.stringify())
                    .send(user)
                    .then(function(res) {
                        return chai.request(app)
                            .get(this.pattern.stringify())
<<<<<<< HEAD
                            .auth('joe', 'string');
=======
                            .auth('joe', 'abc123');
>>>>>>> collab-branch
                    }.bind(this))
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('array');
<<<<<<< HEAD
                        res.body.length.should.equal(1);
=======
                        res.body.length.should.equal(2);
>>>>>>> collab-branch
                        res.body[0].should.be.an('object');
                        res.body[0].should.have.property('username');
                        res.body[0].username.should.be.a('string');
                        res.body[0].username.should.equal(user.username);
                        res.body[0].should.have.property('_id');
                        res.body[0]._id.should.be.a('string');
                    });

            });
        });
        describe('POST', function() {
            it('should allow adding a user', function() {
                var user = {
<<<<<<< HEAD
                    username: 'joe',
                    password: 'string'
=======
                    username: 'frank',
                    password: 'why123'
>>>>>>> collab-branch
                };
                return chai.request(app)
                    .post(this.pattern.stringify())
                    .send(user)
                    .then(function(res) {
                        res.should.have.status(201);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.should.have.header('location');
                        res.body.should.be.an('object');
<<<<<<< HEAD
                        res.body.should.be.empty;
=======
                        res.body.username.should.equal(user.username);
>>>>>>> collab-branch

                        return chai.request(app)
                            .get(res.headers.location);
                    })
                    .then(function(res) {
                        res.body.should.be.an('object');
                        res.body.should.have.property('username');
                        res.body.username.should.be.a('string');
                        res.body.username.should.equal(user.username);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.a('string');
                    });
            });
            it('should reject users without a username', function() {
                var user = {};
                var spy = chai.spy();
                return chai.request(app)
                    .post(this.pattern.stringify())
                    .send(user)
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Missing field: username');
                    });
            });
            it('should reject non-string usernames', function() {
                var user = {
                    username: 42
                };
                var spy = chai.spy();
                return chai.request(app)
                    .post(this.pattern.stringify())
                    .send(user)
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Incorrect field type: username');
                    });
            });
        });
    });

    describe('/users/:userId', function() {
        beforeEach(function() {
            this.pattern = new UrlPattern('/users/:userId');
        });

        describe('GET', function() {
            it('should 404 on non-existent users', function() {
                var spy = chai.spy();
                return chai.request(app)
<<<<<<< HEAD
                    .get(this.pattern.stringify({userId: '000000000000000000000000'}))
=======
                    .get(this.pattern.stringify({
                        userId: '000000000000000000000000'
                    }))
>>>>>>> collab-branch
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
                        res.should.have.status(404);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('User not found');
                    });
            });

            it('should return a single user', function() {
                var user = {
                    username: 'joe',
<<<<<<< HEAD
                    password: 'string'
=======
                    password: 'whhhhhyyyy'
>>>>>>> collab-branch
                };
                var params;
                return chai.request(app)
                    .post('/users')
                    .send(user)
                    .then(function(res) {
                        params = this.pattern.match(res.headers.location);
                        return chai.request(app)
                            .get(this.pattern.stringify({
                                userId: params.userId
<<<<<<< HEAD
                            }));
=======
                            }))
                            .auth('joe', 'abc123');
>>>>>>> collab-branch
                    }.bind(this))
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('username');
                        res.body.username.should.be.a('string');
                        res.body.username.should.equal(user.username);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.a('string');
<<<<<<< HEAD
                        res.body._id.should.equal(params.userId)
=======
                        res.body._id.should.equal(params.userId);
>>>>>>> collab-branch
                    });
            });
        });

        describe('PUT', function() {
            it('should allow editing a user', function() {
                var oldUser = {
                    username: 'joe',
<<<<<<< HEAD
                    password: 'string'
                };
                var newUser = {
                    username: 'joe2',
                    password: 'string'
=======
                    password: 'whyyyyy'
                };
                var newUser = {
                    username: 'joe2',
                    password: 'whyyyyy'
>>>>>>> collab-branch
                };
                var params;
                return chai.request(app)
                    .post('/users')
<<<<<<< HEAD
=======
                    .auth('joe', 'abc123')
>>>>>>> collab-branch
                    .send(oldUser)
                    .then(function(res) {
                        params = this.pattern.match(res.headers.location);
                        return chai.request(app)
                            .put(this.pattern.stringify({
                                userId: params.userId
                            }))
<<<<<<< HEAD
                            .auth('joe', 'string')
=======
                            .auth('joe', 'abc123')
>>>>>>> collab-branch
                            .send(newUser);
                    }.bind(this))
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;

                        return chai.request(app)
                            .get(this.pattern.stringify({
                                userId: params.userId
                            }))
<<<<<<< HEAD
                            .auth('joe2', 'string');
=======
                            .auth('joe', 'abc123');
>>>>>>> collab-branch
                    }.bind(this))
                    .then(function(res) {
                        res.body.should.be.an('object');
                        res.body.should.have.property('username');
                        res.body.username.should.be.a('string');
                        res.body.username.should.equal(newUser.username);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.a('string');
                        res.body._id.should.equal(params.userId);
                    });
            });
<<<<<<< HEAD
            // it('should create a user if they don\'t exist', function() {
            //     var user = {
            //         _id: '000000000000000000000000',
            //         username: 'joe',
            //         password: 'string'
            //     };
            //     return chai.request(app)
            //         .put(this.pattern.stringify({
            //             userId: user._id
            //         }))
            //         .auth('joe', 'string')
            //         .send(user)
            //         .then(function(res) {
            //             res.should.have.status(200);
            //             res.type.should.equal('application/json');
            //             res.charset.should.equal('utf-8');
            //             res.body.should.be.an('object');
            //             res.body.should.be.empty;
            //
            //             return chai.request(app)
            //                 .get(this.pattern.stringify({
            //                     userId: user._id
            //                 }))
            //                 .auth('joe', 'string');
            //         }.bind(this))
            //         .then(function(res) {
            //             res.body.should.be.an('object');
            //             res.body.should.have.property('username');
            //             res.body.username.should.be.a('string');
            //             res.body.username.should.equal(user.username);
            //             res.body.should.have.property('_id');
            //             res.body._id.should.be.a('string');
            //             res.body._id.should.equal(user._id);
            //         });
            // });
            // it('should reject users without a username', function() {
            //     var user = {
            //         _id: '000000000000000000000000'
            //     };
            //     var spy = chai.spy();
            //     return chai.request(app)
            //         .put(this.pattern.stringify({
            //             userId: user._id
            //         }))
            //         .auth('joe', 'string')
            //         .send(user)
            //         .then(spy)
            //         .then(function() {
            //             spy.should.not.have.been.called();
            //         })
            //         .catch(function(err) {
            //             var res = err.response;
            //             res.should.have.status(422);
            //             res.type.should.equal('application/json');
            //             res.charset.should.equal('utf-8');
            //             res.body.should.be.an('object');
            //             res.body.should.have.property('message');
            //             res.body.message.should.equal('Missing field: username');
            //         });
            // });
=======
            it('should create a user if they don\'t exist', function() {
                var user = {
                    _id: '000000000000000000000000',
                    username: 'joe'
                };
                return chai.request(app)
                    .put(this.pattern.stringify({
                        userId: user._id
                    }))
                    .send(user)
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;

                        return chai.request(app)
                            .get(this.pattern.stringify({
                                userId: user._id
                            }));
                    }.bind(this))
                    .then(function(res) {
                        res.body.should.be.an('object');
                        res.body.should.have.property('username');
                        res.body.username.should.be.a('string');
                        res.body.username.should.equal(user.username);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.a('string');
                        res.body._id.should.equal(user._id);
                    });
            });
            it('should reject users without a username', function() {
                var user = {
                    _id: '000000000000000000000000'
                };
                var spy = chai.spy();
                return chai.request(app)
                    .put(this.pattern.stringify({
                        userId: user._id
                    }))
                    .send(user)
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Missing field: username');
                    });
            });
>>>>>>> collab-branch
            it('should reject non-string usernames', function() {
                var user = {
                    _id: '000000000000000000000000',
                    username: 42
                };
                var spy = chai.spy();
                return chai.request(app)
                    .put(this.pattern.stringify({
                        userId: user._id
                    }))
<<<<<<< HEAD
                    .auth(42)
=======
>>>>>>> collab-branch
                    .send(user)
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
                        res.should.have.status(422);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Incorrect field type: username');
                    });
            });
        });

        describe('DELETE', function() {
            it('should 404 on non-existent users', function() {
                var spy = chai.spy();
                return chai.request(app)
<<<<<<< HEAD
                    .delete(this.pattern.stringify({userId: '000000000000000000000000'}))
=======
                    .delete(this.pattern.stringify({
                        userId: '000000000000000000000000'
                    }))
                    .auth('joe','abc123')
>>>>>>> collab-branch
                    .then(spy)
                    .then(function() {
                        spy.should.not.have.been.called();
                    })
                    .catch(function(err) {
                        var res = err.response;
<<<<<<< HEAD
                        res.should.have.status(401);
                        // console.log(res);
                        res.type.should.equal("");
                        // res.charset.should.equal('utf-8');
                        // charset not needed because it not included in the doc array.
                        res.body.should.be.an('object');
=======
                        res.should.have.status(404);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.have.property('message');
                        res.body.message.should.equal('User not found');
>>>>>>> collab-branch
                    });
            });
            it('should delete a user', function() {
                var user = {
                    username: 'joe',
<<<<<<< HEAD
                    password: 'string'
=======
                    password: 'overit321'
>>>>>>> collab-branch
                };
                var params;
                return chai.request(app)
                    .post('/users')
                    .send(user)
                    .then(function(res) {
                        params = this.pattern.match(res.headers.location);
                        return chai.request(app)
                            .delete(this.pattern.stringify({
                                userId: params.userId
<<<<<<< HEAD
                            }))
                            .auth('joe', 'string');


=======
                            })).auth('joe','abc123');
>>>>>>> collab-branch
                    }.bind(this))
                    .then(function(res) {
                        res.should.have.status(200);
                        res.type.should.equal('application/json');
                        res.charset.should.equal('utf-8');
                        res.body.should.be.an('object');
                        res.body.should.be.empty;
                        var spy = chai.spy();
                        return chai.request(app)
                            .get(this.pattern.stringify({
                                userId: params.userId
                            }))
                            .then(spy)
                            .then(function() {
                                spy.should.not.have.been.called();
                            })
                            .catch(function(err) {
                                var res = err.response;
                                res.should.have.status(404);
                            });
<<<<<<< HEAD
                    }.bind(this))
=======
                    }.bind(this));
>>>>>>> collab-branch
            });
        });
    });
});
