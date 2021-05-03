const client = require ('./client'); 

module.exports = {

    async insertAlbums(title, description, cover) {
        const result = await client.query(`INSERT INTO albums (title, description, cover) 
                                            VALUES ($1, $2, $3) RETURNING *`, 
                                            [title, description, cover]);  
    
        return result.rows[0];           
    },

    async findAllAlbums() {
        const result = await client.query(`SELECT * 
                                          FROM albums 
                                          ORDER BY id`); 
        return result.rows;
    }, 

    async findAlbumsById(albumId) {
        const result = await client.query(`SELECT * 
                                           FROM albums 
                                           WHERE id = $1`, [albumId]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows[0];
    },

}