const Account = require('../models/Account');

module.exports = {

    // get 
    getAllAccounts: async function(_req, res) {
        try {
            
            const [rows, fields] = await  Account.fetchAll();

            res.status(200).json(rows);
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },

    getAccountById: async function(req, res) {
        try {
            
            const {user_id} = req.params;

            const [rows, fields] = await Account.fetchById(user_id);
            
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

    addAccount: async function (req,res) {
        try {
            const { full_name, email, password, role_type } = req.body;

            let created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
            let updated_at = created_at;

            const [rows, fields] = await Account.add(full_name, email, password, role_type, created_at, updated_at);
            res.status(200).json(rows);

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },

    updateAccount: async function(req, res) {
        try {
            let { user_id, full_name, role_type, email, password } = req.body;

            user_id = parseInt(user_id);
            role_type = parseInt(role_type);

            let updated_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');

            const [rows, fields] = await Account.update( user_id,full_name, email, password, role_type, updated_at);
            res.status(200).json(rows);
            
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },

    deleteAccount: async function(req, res) {
        try {
            const { user_id } = req.params;

            const [rows, fields] = await Account.delete(user_id);
            res.status(200).json(rows);
        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    }
}
