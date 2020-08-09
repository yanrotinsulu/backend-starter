const express = require('express');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
}
  
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        console.log("OK", req);
        res.redirect('/auths/check');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/check', isAuthenticated, function(req, res) {
    res.json({'status': 'you are authenticated'});
});
  
module.exports = router;