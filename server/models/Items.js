const db = require('../service/mysql.service');

module.exports = {

    fetchById: async function(item_id, callback) {
        return db.execute('SELECT * FROM items WHERE item_id = ?', [item_id]);
    },

    fetchByVendorId: async function(vendor_id){
        return db.execute('SELECT * FROM items WHERE vendor_id = ?', [vendor_id]);
    },

    fetchAll: async function() {
        return db.execute('SELECT * FROM items');
    },

    add: async function(vendor_id, name, quantity, price_unit, barcode_id, created_at, updated_at) {
        return db.execute('INSERT INTO items (vendor_id, name, quantity, price_unit, barcode_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',[vendor_id, name, quantity, price_unit, barcode_id, created_at, updated_at]);
    },

    update: async function(item_id, vendor_id, name, quantity, price_unit, barcode_id, updated_at) {

        return db.execute('UPDATE items SET vendor_id = ?, name = ?, quantity = ?, price_unit = ?, barcode_id = ?, updated_at = ? WHERE item_id = ?', [vendor_id, name, quantity, price_unit, barcode_id, updated_at, item_id]);
    },

    delete: async function(item_id) {
        return db.execute('DELETE FROM items WHERE item_id = ?', [item_id]);
    }

}