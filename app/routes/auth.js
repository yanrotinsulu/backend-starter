import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import authController from '../controllers/authController.js';
import passportConfig from '../configs/passport-config.js';
import isAuthenticated from '../helpers/isauthenticated.js';

const router = express.Router();

switch(passportConfig.strategy) {
  case 'local':
    router.post('/login', 
      passport.authenticate('local', { failureRedirect: '/auth/login' }),
      (req, res) => {
        res.redirect('/');
      }
    );
    router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/auth/login');
    });
    break;

  default:
    router.post('/login', async (req, res) => {
      const userID = await authController(req.body.username, req.body.password);
      if (userID) {
        const token = jwt.sign({ id: userID }, passportConfig.secretKey, { expiresIn: 3600 });
        res.status(200).send({
          token: token,
          message: 'User found and logged in'
        });
      } else {
        res.status(401).redirect('/');
      }
    });
    break;
}

/**
 * @swagger
 * /:
 *   get:
 *     description: Endpoint for everything
 */
router.get('/check', isAuthenticated, (req, res) => {
  res.status(200).json({ 'message': 'You are authenticated' });
});

router.post('/debug',
  (req, res, next) => {
    passport.authenticate(passportConfig.strategy, (error, user, info) => {
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
  // Function to call once successfully authenticated
  (req, res) => {
    res.status(200).send('Logged in!');
  }
);

export default router;
