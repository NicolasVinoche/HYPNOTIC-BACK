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
    
    tipsByCategory: async function(req, res, next) {
        const category = req.query.q; 

        try {
            const tips = await tipsDataMapper.findTipsByCategory(category); 

            res.json({ data: tips });
        
        } catch (error) {
            next(error);
        } 
    }
}