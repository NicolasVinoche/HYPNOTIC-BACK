const contactDataMapper = require('../dataMappers/contactDataMapper'); 

module.exports = {
    getMessages: async function(_, res, next) {
        try {
            const messages = await contactDataMapper.getAllMessages(); 

            res.json ({ data: messages });
        } catch (error) {
            next(error);
        }
    }, 

    postMessage: async function(req, res, next) {
        
        const title  = req.body.title;
        const content = req.body.content; 
        const pseudo = req.body.pseudo;

        function isEmpty(str) {
            return !str.trim().length;
        } 

        const errors = []; 

        if (isEmpty(title)) {
            errors.push('missing title'); 
        };

        if (isEmpty(content)) {
            errors.push('Empty message');
        };  
        if (isEmpty(pseudo)) {
            errors.push('missing pseudo');
        };

        if (errors.length) {
            return res.status(400).json({errors});
        }; 

        try {
            const pseudoUser = await contactDataMapper.verifyPseudo(pseudo); 

            if (pseudoUser) {

            const message = await contactDataMapper.insertMessage(title, content, pseudo);
            res.status(200).json ({  
                'title' : message.title, 
                'content' : message.content, 
                'userId': message.user_id, 
                'pseudo' : message.pseudo 

         }); 

        } else {
            errors.push('Pseudo not found'); 
            return res.status(400).json({errors});
        } 


        
    } catch (error) {
            next(error);
        }
    }
}