const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt.middleware');

router.use('/accounts', require('./account.router'));
router.use('/auth', require('./auth.router'));
router.use('/vendors', require('./vendors.router'));
router.use('/items', require('./items.router'));

module.exports = router;