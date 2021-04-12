const bcrypt = require('bcrypt'); 
var jwtUtils = require('../utils/jwt'); 
const userDataMapper = require('../dataMappers/userDataMapper') 

module.exports = {
    register: async function(req, res, error) { 
        
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password; 
        const pseudo = req.body.pseudo;
        
        //TODO regex

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
                try {
            
                    const newUser = await userDataMapper.newUser(firstName, lastName, email, hash, pseudo);
                    console.log(newUser)
                    res.json({data:newUser})
                } catch (error) {
                    console.log(error);
                }
        
        if (firstName == null || lastName == null || email == null || password == null || pseudo == null) {
            return res.status(400).json({'error': error});
        } 

        
        
        // const userFound = await userDataMapper.findUser(userMail)
        // .then(function async (userFound) {
        //     if(!userFound) {
        //     }
        // })

    }, 

    login: async function(req, res, error) {
        
        const email = req.body.email;
        const password = req.body.password;

        
        try {
            const loginUser = await userDataMapper.loginUser(email)
            console.log(loginUser)
            
            if (loginUser) {
                   const match = await bcrypt.compare(password, loginUser.password);
                   console.log('match:', match)
                   
                       if(match) {
                        return res.status(200).json({
                            'userId': loginUser.id,
                            'token': jwtUtils.generateTokenForUser(loginUser)
                        }); 
                        console.log('Login successful');
                           
                       } else { return res.status(403).json({"error": "invalid password"});
                     }

            } else {
                return res.status(400).json({'Utilisateur introuvale': error});
                
            }
         } catch (error) {
            console.log(error);
        } 
        
    }
}
