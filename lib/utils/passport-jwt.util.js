//passport-jwt.ulti.js
'use strict';

const passportJwt = require('passport-jwt');
const StrategyJWt = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

module.exports = ({
    passport,
    User
}) => {

    const optsJwt = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
    };

    const strategyJwt = new StrategyJWt(optsJwt, (payload, done) => {
        
        User.findById(payload.id, (err, user) => {

            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });

    });

    passport.use(strategyJwt);
}