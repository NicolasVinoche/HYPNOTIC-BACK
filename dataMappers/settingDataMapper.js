const client = require('./client'); 

module.exports = {
    
    async findPassword(userId) {
        const result = await client.query(`SELECT id, password 
                                            FROM users 
                                            WHERE id = $1`, [userId]); 
        if(result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    },
    
    
    async updateUser(pseudo, password, userId) {
        const result = await client.query(`UPDATE users 
                                           SET pseudo = $1, password = $2 
                                           WHERE id = $3 RETURNING *`, [pseudo, password, userId]); 
        return result.rows[0];
    }
}