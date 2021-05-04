const { subscribe } = require('../routers');
const client = require('./client');

module.exports = {
    async findUser(email) {
        const result = await client.query(`SELECT * FROM users WHERE email = $1`,[email]);
        if (result.rowCount === 0) {
            return undefined;
        }
        return result.rows[0];
    }, 
    async newUser(first_name, last_name, email, password, pseudo) {
        const result = await client.query(`INSERT INTO users (first_name, last_name, email, password, pseudo) 
                                            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
                                            [first_name, last_name, email, password, pseudo]);
        return result.rows[0];
    }, 

    async loginUser(email) {
        const result = await client.query(`SELECT * FROM users WHERE email = $1 `,  [email]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    },

    async subscriber(email) {
        const result = await client.query(`UPDATE users
                                           SET role = 2 WHERE email = $1 RETURNING *`, [email]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }, 

    async subscriptionEnd (sub_end, email) {
        const result = await client.query(`UPDATE users
                                           SET sub_end = $1 WHERE email = $2 RETURNING * `, [sub_end, email])
        return result.rows[0];
    }, 

    async subscriberSet(email) {
        const result = await client.query(`UPDATE users
                                           SET role = 1 WHERE email = $1 RETURNING *`, [email]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }, 

    async logoutSet(userId) {
        const result = await client.query(`UPDATE users
                                           SET isLogged = false WHERE id = $1 RETURNING *`, [userId]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }, 

    async loginSet(email) {
        const result = await client.query(`UPDATE users 
                                           SET isLogged = true WHERE email = $1 RETURNING *`, [email]); 
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    },

    async updateItem(item, email) {
        const result = await client.query(`UPDATE users 
                                           SET item = $1 
                                           WHERE email = $2 RETURNING *`, [item, email]); 
        return result.rows[0];
    }, 

    async getItem(userId) {
        const result = await client.query(`SELECT id, item FROM users WHERE id = $1`, [userId]); 

        return result.rows[0];
    }
}