var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
<<<<<<< HEAD
=======

>>>>>>> collab-branch
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
<<<<<<< HEAD
        unique: true // should not match anything in database
    },
    password: {
        type: String,
        required: true // mean its required
    }
});

UserSchema.methods.validatePassword = function(password, callback){
        bcrypt.compare(password, this.password, function(err, isValid){ // comparing the input password with current password in database
            if(err){
                callback(err);
                return;
            }
            callback(null, isValid);
        });
};
var User = mongoose.model('User', UserSchema);
// validating a password

=======
        unique: true
    },
    password: {
      type: String,
      required: true
    }
});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

var User = mongoose.model('User', UserSchema);
>>>>>>> collab-branch

module.exports = User;
