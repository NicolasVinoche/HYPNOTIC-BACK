const client = require ('./client'); 

module.exports = {

    async findAllTracks() {
        const result = await client.query(`SELECT * 
                                           FROM tracks 
                                           ORDER BY id`); 
        return result.rows;
    }, 

    async findTracksById (tracksId) {
        const result = await client.query(`SELECT * 
                                            FROM tracks 
                                            WHERE id = $1`, [tracksId]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows[0];
    }, 

    async insertTracks(track_number, title, description, price, link, album_id) {
        const result = await client.query(`INSERT INTO tracks (track_number, title, description, price, link, album_id) 
                                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                                            [track_number, title, description, price, link, album_id]);  
    
        return result.rows[0];           
    },

}