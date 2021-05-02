const contactDataMapper = require('../dataMappers/contactDataMapper'); 

module.exports = {
    getMessages: async function(_, res, next) {
        try {
            const messages = await contactDataMapper.getAllMessages(); 

            res.json ({ messages });
        } catch (error) {
            next(error);
        }
    }, 

    postMessage: async function(req, res, next) {
        
        const title  = req.body.title;
        const content = req.body.content; 
        const pseudo = req.body.pseudo;
        const userId = req.params.id;

        function isEmpty(str) {
            return !str.trim().length;
        } 

        const errors = []; 

        if (isEmpty(title)) {
            errors.push('Le champ titre est vide'); 
        };

        if (isEmpty(content)) {
            errors.push('Contenu du message vide');
        };  
        if (isEmpty(pseudo)) {
            errors.push('Le champ pseudo est vide');
        };

        if (errors.length) {
            return res.status(400).json({errors});
        }; 

        try {
            const pseudoUser = await contactDataMapper.verifyPseudo(pseudo); 

            if (pseudoUser) {

            const message = await contactDataMapper.insertMessage(title, content, pseudo, userId);
            res.status(200).json ({  
                'title' : message.title, 
                'content' : message.content, 
                'userId': userId, 
                'pseudo' : message.pseudo 
            }); 

        } else {
            errors.push('Pseudo introuvable'); 
            return res.status(400).json({errors});
        } 

    } catch (error) {
            next(error);
        }
    }
}