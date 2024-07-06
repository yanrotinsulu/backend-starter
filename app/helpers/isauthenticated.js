import passportModule from 'passport';
const { passport } = passportModule;
import passportConfigModule from '../configs/passport-config.js';
const passportConfig = passportConfigModule;

let isAuthenticatedFunction;

switch (passportConfig.strategy){
    case "local":
        isAuthenticatedFunction = function isAuthenticated(req, res, next) {
            if (req.isAuthenticated())
                return next();
            res.json({'status': 'you are not authenticated'});
        }
        break;
    // jwt is default
    default:
        isAuthenticatedFunction = function isAuthenticated(req, res, next) {
            passport.authenticate('jwt', {session:false}, function(err,user){
                if(err || !user){
                    res.status(401).json({'message': 'you are not authenticated'});
                }
                else{
                    next();
                }
            })(req,res);
        }
        break;
}

//module.exports = isAuthenticatedFunction;
export default isAuthenticatedFunction;