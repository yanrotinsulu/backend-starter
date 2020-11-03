const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authService = require('../services/auth_services');
const passportConfig = require('../configs/passport-config');
const isAuthenticated = require('../helpers/isauthenticated');

switch(passportConfig.strategy){
  case "local":
    router.post('/login', 
      passport.authenticate('local', { failureRedirect: '/auths/login' }),
      function(req, res) {
        res.redirect('/');
      }
    );
    router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/auths/login');
    });
    break;
  
  default:
    router.post('/login', async function(req, res) {
        UserID = await authService.getUserId(req.body.username, req.body.password);
        if (UserID){
          const token = jwt.sign({ id : UserID }, passportConfig.secretKey, {expiresIn: 3600});
          res.status(200).send({
            token: token,
            message: 'user found and logged in'
          });
        }
        else{
          res.status(401).redirect('/');
        }
      }
    );
    break;
}

router.get('/check', isAuthenticated, function(req, res) {
  res.status(200).json({'message': 'you are authenticated'});
});

router.post('/debug',
  function (req, res, next) {
    passport.authenticate(passportConfig.strategy, function (error, user, info) {
      console.log(req);
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        next();
      }
    })(req, res);
  },
  // function to call once successfully authenticated
  function (req, res) {
    res.status(200).send('logged in!');
  }
);
  
module.exports = router;