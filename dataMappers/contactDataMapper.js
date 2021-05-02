const client = require('./client'); 

module.exports = {

    async getAllMessages() {
        const result = await client.query(`SELECT * FROM message_contact`); 
 // JOIN users ON users.pseudo = message_contact.pseudo
        return result.rows;
    }, 

    async insertMessage(title, content, pseudo, user_id) {
        const result = await client.query(`INSERT INTO message_contact(title, content, pseudo, user_id) 
                                            VALUES ($1, $2, $3, $4)
                                            RETURNING *`, [title, content, pseudo, user_id]); 

        return result.rows[0];                                    
    }, 

    async deleteMessage( message_id ) {
        const result = await client.query(`DELETE FROM message_contact WHERE id = $1`, [message_id]);
        return result.rows[0];
    },
    
    async verifyPseudo(pseudo) {
        const result = await client.query(`SELECT id, pseudo FROM users WHERE pseudo = $1`, [pseudo]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }
}