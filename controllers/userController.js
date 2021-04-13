const bcrypt = require('bcrypt');  
var jwtUtils = require('../utils/jwt'); 
const userDataMapper = require('../dataMappers/userDataMapper') 

const regex_password = /^(?=.*\d).{5,20}$/;
const regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    register: async function(req, res, error) { 
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword
        const pseudo = req.body.pseudo;
        
        function isEmpty(str) {
            return !str.trim().length;
        }

        const errors = [];
                    
        if (isEmpty(firstName)) {
            errors.push('missing first name'); 
        };

        if (isEmpty(lastName)) {
            errors.push('missing last name');
        };
        
        if (isEmpty(email)) {
            errors.push('missing email');
        }; 

        if (!regex_email.test(email)) {
            errors.push('wrong email format');
        };

        if (isEmpty(password)) {
            errors.push(`missing password`);
        };

        if (!regex_password.test(password)) {
            errors.push('password invalid (must length 5 - 20 and include 1 number at least)');
        };

        if (isEmpty(confirmPassword)) {
            errors.push('missing password confirmation');
        };

        if (confirmPassword !== password) {
            errors.push('password confimation not correct');
        };

        if (isEmpty(pseudo)) {
            errors.push('missing pseudo');
        };

        if (pseudo.length >= 13 || pseudo.length <= 4) {
            errors.push('wrong pseudo (must be length 5 - 12)');
        }; 

        if (errors.length) {
            return res.status(400).json({errors});
        }
        
        const userFound = await userDataMapper.findUser(email)

        if(!userFound) { 
             const salt = bcrypt.genSaltSync(10);
             const hash = bcrypt.hashSync(password, salt);
                     try {
                 
                         const newUser = await userDataMapper.newUser(firstName, lastName, email, hash, pseudo);
                         console.log(newUser)
                         res.json({data:newUser})
                     } catch (error) {
                         console.log(error);
                     }

         } else {
            return res.status(400).json('this email already exist');
         }
        
        

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
