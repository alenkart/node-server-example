const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');

//JWT
const optsJwt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_JWT_SECRET,
    issuer: process.env.PASSPORT_JWT_ISSUER,
    audience: process.env.PASSPORT_JWT_AUDIENCE,
};

const strategy = new Strategy(optsJwt, (jwt_payload, done) => { });

passport.use(strategy);