const tracksDataMapper = require('../dataMappers/tracksDataMapper'); 

module.exports = {
    getTracks: async function(_, res, next) {
        try { 
            const projects = await tracksDataMapper.findAllTracks(); 
            console.log('projects:', projects)

            res.json({ data: projects });
        } catch (error) {
            next(error);
        }
    }, 
    
    trackById: async function(req, res, next) {
        const trackId = req.params.id; 

        try {
            const track = await tracksDataMapper.findTracksById(trackId); 

            res.json({ data: track });
        
        } catch (error) {
            next(error);
        } 
    }, 

}