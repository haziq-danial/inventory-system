const express = require('express');
const router = express.Router();

router.use('/accounts', require('./account.router'));
router.use('/auth', require('./auth.router'));

module.exports = router;