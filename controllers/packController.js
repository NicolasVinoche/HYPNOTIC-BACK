const packDataMapper = require('../dataMappers/packDataMapper');

module.exports = {
    getPacks: async function(_, res, next) {
        try {
            const packs = await packDataMapper.findAllPacks();
        
            res.json({ data: packs });
        } catch (error) {
            next(error);
        }
    }, 

    packById: async function(req, res, next) {
        const packId = req.params.id; 
        console.log(packId)

        try {
            const pack = await packDataMapper.findPacksById(packId); 

             res.json({ data: pack });
        
        }   catch (error) {
            next(error);
        }
    }, 

    packByTag: async function(req, res, next) {
        const tag = req.query.q;  

        console.log(tag);

        try {
            const packs = await packDataMapper.findPacksByTag(tag); 
 
            res.json({ data: packs });

            
        }   catch (error) {
            next(error);
        }
    },

}