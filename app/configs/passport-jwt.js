const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const hashHelper = require('../helpers/hashes');
const jwtConfig = require('./jwt-config');

let context = require('../data/models/index');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.secretKey;
//opts.issuer = 'development.fyprsol.com';
//opts.audience = 'fyprsol.com';
opts.usernameField = 'email';
opts.passwordField = 'password';

module.exports = function(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        var user = await context.users.findOne({ where: { id: jwt_payload.id } });
        if(user){
            return done(null,user);
        }
        else{
            return done(null, false, { message: 'Something went wrong.' });
        }
    }));
}