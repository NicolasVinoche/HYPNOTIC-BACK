const client = require ('./client'); 

module.exports = {

    async findAllStreams() {
        const result = await client.query(`SELECT * 
                                           FROM streams 
                                           ORDER BY id`); 
        return result.rows;
    }
}