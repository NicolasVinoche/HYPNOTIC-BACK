const tipsDataMapper = require('../dataMappers/tipsDataMapper'); 

module.exports = {
    getTips: async function(_, res, next) {
        try { 
            const tips = await tipsDataMapper.findAllTips(); 

            res.json({ data: tips });
        } catch (error) {
            next(error);
        }
    }, 
    
    tipsById: async function(req, res, next) {
        const tipsId = req.params.id; 

        try {
            const tips = await tipsDataMapper.findTipsById(tipsId); 

            res.json({ data: tips });
        
        } catch (error) {
            next(error);
        } 
    }
}