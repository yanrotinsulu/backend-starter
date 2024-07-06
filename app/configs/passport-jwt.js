import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import hashHelper from '../helpers/hashes.js';
import jwtConfig from './passport-config.js';

import model from '../data/models/index.js';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.secretKey;
//opts.issuer = 'any';
//opts.audience = 'any';
opts.usernameField = 'username';
opts.passwordField = 'password';

export default function def(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await model.user.findOne({ where: { id: jwt_payload.id } });
        if(user){
            return done(null,user);
        }
        else{
            return done(null, false, { message: 'Something went wrong.' });
        }
    }));
}