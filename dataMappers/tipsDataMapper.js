const client = require ('./client'); 

module.exports = {

    async findAllTips() {
        const result = await client.query(`SELECT * 
                                           FROM tips 
                                           ORDER BY id`); 
        return result.rows;
    }, 

    async findTipsByCategory (category) {
        const result = await client.query(`SELECT * 
                                            FROM tips 
                                            WHERE category = $1`, [category]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows;
    }

}