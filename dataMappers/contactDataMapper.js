const client = require('./client'); 

module.exports = {

    async getAllMessages() {
        const result = await client.query(`SELECT * FROM message_contact`); 
 // JOIN users ON users.pseudo = message_contact.pseudo
        return result.rows;
    }, 

    async insertMessage(title, content, pseudo) {
        const result = await client.query(`INSERT INTO message_contact(title, content, pseudo) 
                                            VALUES ($1, $2, $3) 
                                            RETURNING *`, [title, content, pseudo]); 

        return result.rows[0];                                    
    }, 
    
    async verifyPseudo(pseudo) {
        const result = await client.query(`SELECT pseudo FROM users WHERE pseudo = $1`, [pseudo]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }
}