const Vendors = require('../models/Vendors');


module.exports = {

    getAllVendors: async function(_req, res) {
        try {
            
            const [rows, fields] = await Vendors.fetchAll();

            res.status(200).json(rows);
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    getVendorById: async function(req, res) {
        try {
            
            const {vendor_id} = req.params;

            const [rows, fields] = await Vendors.fetchById(vendor_id);
            
            if (rows) {
                res.status(200).json(rows);
            } else {
                res.status(404).json({
                    error: 'Account not found'
                });
            }
            

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    addVendor: async function(req, res) {
        try {
            const { company_name, brand, contact, address, email } = req.body;
            console.log(req.body);

            let created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
            let updated_at = created_at;

            const [rows, fields] = await Vendors.add(company_name, brand, contact, address, email, created_at, updated_at);
            res.status(200).json(rows);

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    updateVendor: async function(req, res) {
        try {
            const { vendor_id, company_name, brand, contact, address, email } = req.body;
            console.log(req.body);

            let updated_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

            const [rows, fields] = await Vendors.update( vendor_id, company_name, brand, contact, address, email, updated_at);
            res.status(200).json(rows);
            
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    deleteVendor: async function(req, res) {
        try {
            const { vendor_id } = req.params;
            console.log(req.params);

            const [rows, fields] = await Vendors.delete(vendor_id);
            res.status(200).json(rows);
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }

}