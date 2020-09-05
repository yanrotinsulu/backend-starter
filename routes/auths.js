const express = require('express');
const router = express.Router();
const passport = require('passport');
const authService = require('../services/auth_services');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt-config');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.json({'status': 'you are not authenticated'});
}

//with local strategy
router.post('/login-local', 
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        console.log("OK", req);
        res.redirect('/auths/check');
    }
);

//with jwt strategy
router.post('/login', async function(req, res) {
      UserID = await authService.getUserId(req.body.username, req.body.password);
      if (UserID){
        console.log("OK");
        const token = jwt.sign({ id : UserID }, jwtConfig.secretKey);
        res.status(200).send({
          authorized: true,
          token: token,
          message: 'user found ang logged in'
        });
      }
      else{
        res.status(401).redirect('/');
      }
    }
);


router.get('/login', function(req, res){
    res.json({'status': 'ini get login'});
});

router.get('/logout-local', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/check-local', isAuthenticated, function(req, res) {
    res.json({'status': 'you are authenticated'});
});

router.get('/check', passport.authenticate('jwt', {session:false}), function(req, res) {
  res.json({'status': 'your JWT is authenticated'});
});

router.post('/login-debug',
  // wrap passport.authenticate call in a middleware function
  function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('jwt', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
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
      // res.status(401).send(error);
    })(req, res);
  },

  // function to call once successfully authenticated
  function (req, res) {
    res.status(200).send('logged in!');
  }
);
  
module.exports = router;