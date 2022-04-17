const express = require('express');
const router = express.Router();

router.use('/accounts', require('./account.router'));
router.use('/auth', require('./auth.router'));
router.use('/vendors', require('./vendors.router'));

module.exports = router;