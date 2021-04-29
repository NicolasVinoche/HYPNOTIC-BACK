const { link } = require('fs');
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
       }, 
       
       async insertPack(title, description, price, tag, link) {
            const result = await client.query(`INSERT INTO packs (title, description, price, tag, link) 
                                                VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
                                                [title, description, price, tag, link]);  
        
            return result.rows[0];           
        }, 

        async insertLink(link) {
            const result = await client.query(`INSERT INTO packs (link) 
                                                VALUES ($1) RETURNING *`, 
                                                [link]); 

            return result.rows[0];                                                                        
        }
        
}