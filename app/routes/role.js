const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helpers/isauthenticated');

// Require controller modules.
const role_controller = require('../controllers/roleController');

/// Role ROUTES ///

router.get('/check', role_controller.check_role);

module.exports = router;