//passport-jwt.ulti.js
'use strict';

import User from '../models/user.model';
import { Strategy, ExtractJwt } from 'passport-jwt';

const optsJwt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
};

const strategyJwt = new Strategy(optsJwt, (payload, done) => {

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

export default strategyJwt;

