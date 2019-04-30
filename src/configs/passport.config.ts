// passport.config

import passport from 'passport';
import passportJwt from './passport-jwt.config';

passport.use(passportJwt);

export default passport;