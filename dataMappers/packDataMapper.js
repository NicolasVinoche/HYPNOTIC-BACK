const client = require ('./client'); 

module.exports = {

        async findAllPacks() {
            const result = await client.query(`SELECT * 
                                              FROM packs 
                                              ORDER BY id`); 
            return result.rows;
        }, 

        async findPacksById(packId) {
            const result = await client.query(`SELECT * 
                                               FROM packs 
                                               WHERE id = $1`, [packId]); 
            if (result.rowCount === 0) {
                return undefined;
            } 

            return result.rows[0];
        }, 

        async findPacksByTag(tag) {
            const result = await client.query(`SELECT * 
                                               FROM packs  
                                               WHERE tag = $1 
                                               `, [tag]); 
            if (result.rowCount === 0) {
                return undefined;
            } 
                                
            return result.rows;
       }     
        
}