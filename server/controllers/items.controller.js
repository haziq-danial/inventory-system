const Items = require('../models/Items');


module.exports = {

    getAllItems: async function(_req, res) {
        try {
            
            const [rows, fields] = await Items.fetchAll();

            res.status(200).json(rows);
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    getItemById: async function(req, res) {
        try {
            
            const {item_id} = req.params;

            const [rows, fields] = await Items.fetchById(item_id);
            
            if (rows) {
                res.status(200).json(rows);
            } else {
                res.status(404).json({
                    error: 'Item not found'
                });
            }
            

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    addItem: async function(req, res) {
        try {
            const { vendor_id, name, quantity, price_unit, barcode_id } = req.body;
            console.log(req.body);

            let created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
            let updated_at = created_at;

            const [rows, fields] = await Items.add(vendor_id, name, quantity, price_unit, barcode_id, created_at, updated_at);
            res.status(200).json(rows);

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    updateItem: async function(req, res) {
        try {
            const { item_id, vendor_id, name, quantity, price_unit, barcode_id } = req.body;
            console.log(req.body);

            let updated_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

            const [rows, fields] = await Items.update( item_id, vendor_id, name, quantity, price_unit, barcode_id, updated_at);
            res.status(200).json(rows);
            
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },
    deleteItem: async function(req, res) {
        try {
            const { item_id } = req.params;
            console.log(req.params);

            const [rows, fields] = await Items.delete(item_id);

            res.status(200).json(rows);
            
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }

}