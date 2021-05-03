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

    async insertTracks(title, track_number, description, price, album_id, file) {
        const result = await client.query(`INSERT INTO tracks (title, track_number, description, price, album_id, bucket_link) 
                                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                                            [title, track_number, description, price, album_id, file]);  
    
        return result.rows[0];           
    },

    async findTracksByAlbum (albumId) {
        const result = await client.query(`SELECT * 
                                            FROM tracks 
                                            WHERE album_id = $1`, [albumId]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows;
    },

}