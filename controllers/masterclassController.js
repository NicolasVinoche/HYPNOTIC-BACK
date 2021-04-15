const masterclassDataMapper = require('../dataMappers/masterclassDataMapper'); 

module.exports = {
    getMasterclasses: async function(_, res, next) {
        try {
            const masterclasses = await masterclassDataMapper.findAllMasterclasses(); 

            res.json({ data: masterclasses }); 
        } catch(error) {
            next(error);
        }
    }
}