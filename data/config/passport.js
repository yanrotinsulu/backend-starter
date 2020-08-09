const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const hashHelper = require('../../helper/hash');

let context = require('../models/index');

module.exports = function(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        },
        async function(email, password, done) {
            var user = await context.users.findOne({ where: { email: email } });
            if(user && hashHelper.compareSync(password,user.password)){
                return done(null,user);
            }
            else{
                return done(null, false, { message: 'Incorrect username and password.' });
            }
       }
    ));
}