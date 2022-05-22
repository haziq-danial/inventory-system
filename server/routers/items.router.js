const express = require('express');
const router = express.Router();

const controller = require('../controllers/items.controller');

// accounts

router.get('/get', controller.getAllItems);
router.get('/find/:item_id', controller.getItemById);
router.get('/find/vendor/:vendor_id', controller.getItemFromVendor);
router.post('/add', controller.addItem);
router.post('/update', controller.updateItem);
router.get('/delete/:item_id', controller.deleteItem);

module.exports = router;