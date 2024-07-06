import express from 'express';
const router = express.Router();
import isAuthenticated from '../helpers/isauthenticated.js';

// Require controller modules.
import role_controller from '../controllers/roleController.js';

/// Role ROUTES ///

router.get('/check', role_controller);

//module.exports = router;
export default router;