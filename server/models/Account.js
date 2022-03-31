const db = require('../service/mysql.service');

module.exports = {

    login: async function (email, password) {

        const [rows, fields] = await db.execute('SELECT * FROM accounts WHERE email = ?', [email]);
        const user = rows[0];
        console.log(user);

        if (user) {
            
            const isValid = (password === user.password) ? true : false;
            
            if (isValid) {
                switch (user.role_type) {
                    case 1:
                        user.role_type = 'admin'
                        break;
                    case 2:
                        user.role_type = 'user'
                        break;
                
                    default:
                        break;
                }
                return user;
            }

        }

        return null;
    },

    fetchById: async function(user_id, callback) {
        return db.execute('SELECT * FROM accounts WHERE user_id = ?', [user_id]);
    },

    fetchAll: async function() {
        return db.execute('SELECT * FROM accounts');
    },

    add: async function(full_name, email, password, role_type, created_at, updated_at) {
        return db.execute('INSERT INTO accounts (full_name, email, password, role_type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',[full_name, email, password, role_type, created_at, updated_at]);
    },

    update: async function(user_id, full_name, email, password, role_type, updated_at) {

        return db.execute('UPDATE accounts SET full_name = ? , email = ?, password = ?, role_type = ?, updated_at = ? WHERE user_id = ?', [full_name, email, password, role_type, updated_at, user_id]);
    },

    delete: async function(user_id) {
        return db.execute('DELETE FROM accounts WHERE user_id = ?', [user_id]);
    }

}