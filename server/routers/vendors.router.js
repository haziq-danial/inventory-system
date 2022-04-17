const express = require('express');
const router = express.Router();

const controller = require('../controllers/vendors.controller');

// accounts

router.get('/get', controller.getAllVendors);
router.get('/find/:vendor_id', controller.getVendorById);
router.post('/add', controller.addVendor);
router.post('/update', controller.updateVendor);
router.get('/delete/:vendor_id', controller.deleteVendor);

module.exports = router;