const projectsDataMapper = require('../dataMappers/projectsDataMapper'); 

module.exports = {
    getProjects: async function(_, res, next) {
        try { 
            const projects = await projectsDataMapper.findAllProjects(); 

            res.json({ data: projects });
        } catch (error) {
            next(error);
        }
    }, 
    
    projectById: async function(req, res, next) {
        const projectId = req.params.id; 

        try {
            const project = await projectsDataMapper.findProjectsById(projectId); 

            res.json({ data: project });
        
        } catch (error) {
            next(error);
        } 
    }, 

}