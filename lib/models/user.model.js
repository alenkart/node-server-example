//user.model.js
'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        require: true,
        default: true,
    }
});

UserSchema.pre('save', async function (next) {

    try {

        const user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            next();
            return; 
        }

        const saltRound = parseInt(process.env.AUTH_SALT_ROUND);
        // generate a salt
        const salt = await bcrypt.genSalt(saltRound);
        // hash the password using our new salt
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;

        next();

    } catch (error) {

        console.log(error);

        next(error);
    }

});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {

    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        }

        cb(null, isMatch);

    });

};

module.exports = mongoose.model('User', UserSchema);