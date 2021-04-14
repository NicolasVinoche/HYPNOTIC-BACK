const client = require ('./client'); 

module.exports = {

    async findAllTips() {
        const result = await client.query(`SELECT * 
                                           FROM tips 
                                           ORDER BY id`); 
        return result.rows;
    }, 

    async findTipsById (tipsId) {
        const result = await client.query(`SELECT * 
                                            FROM tips 
                                            WHERE id = $1`, [tipsId]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows[0];
    }

}