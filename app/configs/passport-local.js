const LocalStrategy = require('passport-local').Strategy;
const hashHelper = require('../helpers/hashes');
const {Op} = require('sequelize');

let model = require('../data/models/index');

module.exports = function(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
        },
        async function(username, password, done) { //it's always username, password, done
            const user = await model.user.findOne(
                { 
                    where: { 
                        [Op.or]: [
                            { username: username },
                            { email: username }
                        ]
                    } 
                }
            );
            if(!user){
                return done(null, false, { message: 'Incorrect username and password.' });
            }
            else{
                const compare = await hashHelper.compareAsync(password, user.password);
                if(compare){
                    return done(null,user);
                }
                else{
                    return done(null, false, { message: 'Wrong username or password.' });
                }
            }
       }
    ));
}