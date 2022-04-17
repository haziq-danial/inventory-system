const db = require('../service/mysql.service');

module.exports = {

    fetchById: async function(vendor_id, callback) {
        return db.execute('SELECT * FROM vendors WHERE vendor_id = ?', [vendor_id]);
    },

    fetchAll: async function() {
        return db.execute('SELECT * FROM vendors');
    },

    add: async function(company_name, brand, contact, address, email, created_at, updated_at) {
        return db.execute('INSERT INTO vendors (company_name, brand, contact, address, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',[company_name, brand, contact, address, email, created_at, updated_at]);
    },

    update: async function(vendor_id, company_name, brand, contact, address, email, updated_at) {

        return db.execute('UPDATE vendors SET company_name = ?, brand = ?, contact = ?, address = ?, email = ?, updated_at = ? WHERE vendor_id = ?', [company_name, brand, contact, address, email, updated_at, vendor_id]);
    },

    delete: async function(vendor_id) {
        return db.execute('DELETE FROM vendors WHERE vendor_id = ?', [vendor_id]);
    }

}