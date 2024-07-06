import express from 'express';
const router = express.Router();

import authentication from '../helpers/isauthenticated.js';
const isAuthenticated = authentication;

// Require controller modules.
import userController from '../controllers/userController.js';
const user_controller = userController;

/// USER ROUTES ///

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get('/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/create', isAuthenticated, user_controller.user_create_post);

// GET request to delete User.
router.get('/:id/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/:id/delete', user_controller.user_delete_post);

// DELETE request to delete User.
router.delete('/:id', isAuthenticated, user_controller.user_delete_delete);

// GET request to update User.
router.get('/:id/update', user_controller.user_update_get);

// POST request to update User.
router.post('/:id/update', user_controller.user_update_post);

// PATCH request to update User
router.patch('/:id', isAuthenticated, user_controller.user_update_patch);

// GET request for one User.
router.get('/:id', user_controller.user_detail);

// GET request for list of all Users.
router.get('/', isAuthenticated, user_controller.user_list);

//router.get('/', (req, res) => res.send('masuk gan di user'))

//module.exports = router;
export default router;