const albumDataMapper = require('../dataMappers/albumDataMapper');

module.exports = {
    getAlbum: async function(_, res, next) {
        try {
            const albums = await albumDataMapper.findAllAlbums();
            console.log(albums)
            res.json({ data: albums });
        } catch (error) {
            next(error);
        }
    }, 

    albumById: async function(req, res, next) {
        const albumId = req.params.id; 
        console.log(albumId)

        try {
            const album = await albumDataMapper.findAlbumsById(albumId); 

             res.json({ data: album });
        
        }   catch (error) {
            next(error);
        }
    },

}