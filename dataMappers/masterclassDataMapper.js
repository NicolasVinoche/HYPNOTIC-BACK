const client = require ('./client'); 

module.exports = {

    async findAllMasterclasses() {
        const result = await client.query(`SELECT * 
                                            FROM masterclasses 
                                            ORDER BY id`); 
        return result.rows;
    }
}