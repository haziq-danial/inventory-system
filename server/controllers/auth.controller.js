const Account = require('../models/Account');

module.exports = {

    login: async function(req, res) {
        try {

            const { email, password } = req.body;


            const account = await Account.login(email, password);

            if (account) {
                res.status(200).json(account);
            } else {
                res.status(401).json({
					error: "User not found/ wrong password",
				});
            }

        } catch (error) {
            console.log(`[ERROR] ${error}`);
            res.status(500).json({
                error: error
            });
        }
    },

    register: async function(req, res) {
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

}