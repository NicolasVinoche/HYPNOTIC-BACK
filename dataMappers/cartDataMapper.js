const client = require('./client'); 

module.exports = {

    async updateCart(cart, userId) {
        const result = await client.query(`UPDATE users 
                                           SET cart = $1 
                                           WHERE id = $2 RETURNING *`, [cart, userId]); 
        return result.rows[0];
    }, 

    async getCart(userId) {
        const result = await client.query(`SELECT id, cart FROM users WHERE id = $1`, [userId]); 

        return result.rows[0];
    }
}