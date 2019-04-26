// passport.util.ts

import passport from 'passport';
import passportJwt from './passport-jwt.util';

passport.use(passportJwt);

export default passport;