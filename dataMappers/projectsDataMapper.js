const client = require ('./client'); 

module.exports = {

    async findAllProjects() {
        const result = await client.query(`SELECT * 
                                           FROM projects 
                                           ORDER BY id`); 
        return result.rows;
    }, 

    async findProjectsById (projectId) {
        const result = await client.query(`SELECT * 
                                            FROM projects 
                                            WHERE id = $1`, [projectId]); 
        if (result.rowCount === 0) {
            return undefined;
        } 

        return result.rows;
    }

}