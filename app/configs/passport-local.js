import { Strategy as LocalStrategy } from 'passport-local';
import hashHelper from '../helpers/hashes.js';
import { Op } from 'sequelize';

import model from '../data/models/index.js';

export default function def(passport){
    
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