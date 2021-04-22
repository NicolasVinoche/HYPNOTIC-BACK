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

    async subscriptionId (sub_id, email) {
        const result = await client.query(`INSERT INTO users (sub_id) 
                                           VALUES ($1) WHERE email = $2 RETURNING * `, [sub_id, email])
    }
}