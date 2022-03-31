const express = require('express');
const router = express.Router();

const controller = require('../controllers/account.controller');

// accounts

router.get('/get', controller.getAllAccounts);
router.get('/find/:user_id', controller.getAccountById);
router.post('/add', controller.addAccount);
router.post('/update', controller.updateAccount);
router.get('/delete/:user_id', controller.deleteAccount);

module.exports = router;