const client = require('./client');

module.exports = {
    async findUser(userMail) {
        const result = await client.query(`SELECT * FROM users WHERE email = $1`,[userMail]);
        if (result.rowCount === 0) {
            return undefined;
        }
        return result.rows[0];
    }, 
    async newUser(first_name, last_name, email, password, pseudo) {
        const result = await client.query(`INSERT INTO users (first_name, last_name, email, password, pseudo) 
                                            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
                                            [first_name, last_name, email, password, pseudo]);
        return result.rows;
    }, 

    async loginUser(email) {
        const result = await client.query(`SELECT * FROM users WHERE email = $1 `,  [email]);
        if (result.rowCount === 0) {
            return undefined;
        } 
        return result.rows[0];
    }
}