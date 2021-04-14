const streamDataMapper = require('../dataMappers/streamDataMapper'); 

module.exports = {
    getStreams: async function(req, res, next) {
        try { 
            const streams = await streamDataMapper.findAllStreams(); 

            res.json({ data: streams });
        } catch (error) {
            next(error);
        }
    }
}