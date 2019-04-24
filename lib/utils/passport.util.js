const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');

//JWT

const optsJwt = {}
optsJwt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optsJwt.secretOrKey = process.env.PASSPORT_JWT_SECRET;
optsJwt.issuer = process.env.PASSPORT_JWT_ISSUER;
opts_jwt.audience = process.env.PASSPORT_JWT_AUDIENCE;

const strategy = new Strategy(optsJwt, (jwt_payload, done) => {});

passport.use(strategy);