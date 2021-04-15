const projectsDataMapper = require('../dataMappers/projectsDataMapper'); 

module.exports = {
    getProjects: async function(_, res, next) {
        try { 
            const projects = await projectsDataMapper.findAllProjects(); 

            res.json({ data: packs });
        } catch 
    } 
}