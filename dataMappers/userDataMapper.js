const client = require('./client');

module.exports = {
    async findUser(userMail) {
        const result = await client.query(`SELECT * FROM users WHERE email = $1`,[userMail]);
        if (result.rowCount === 0) {
            return undefined;
        }
        return result.rows[0];
    }, 
    async newUser(first_name, last_name, email, password) {
        const result = await client.query(`INSERT INTO users (first_name, last_name, email, password) 
                                            VALUES ($1, $2, $3, $4) RETURNING *`, 
                                            [first_name, last_name, email, password]);
        return result.rows;
    }
}