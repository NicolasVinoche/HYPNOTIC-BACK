const bcrypt = require('bcrypt');  
var jwtUtils = require('../utils/jwt'); 
var cookies = require('cookies'); 
var cookieparser = require('cookie-parser')
const userDataMapper = require('../dataMappers/userDataMapper'); 


const regex_password = /^(?=.*\d).{5,20}$/;
const regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    register: async function(req, res, next) { 
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const pseudo = req.body.pseudo;
        
        function isEmpty(str) {
            return !str.trim().length;
        }

        const errors = [];
                    
        if (isEmpty(firstName)) {
            errors.push('Le champ prénom est vide'); 
        };

        if (isEmpty(lastName)) {
            errors.push('Le champ nom est vide');
        };
        
        if (isEmpty(email)) {
            errors.push('Le champ email est vide');
        }; 

        if (!regex_email.test(email)) {
            errors.push('Format de l\'adresse mail invalide');
        };

        if (isEmpty(password)) {
            errors.push(`Le champ mot de passe est vide`);
        };

        if (!regex_password.test(password)) {
            errors.push('Mot de passe invalide (entre 5 et 20 caractères avec au moins 1 chiffre)');
        };

        if (isEmpty(confirmPassword)) {
            errors.push('Veuillez confirmer votre mot de passe');
        };

        if (confirmPassword !== password) {
            errors.push('Le mot de passe ne correspond pas');
        };

        if (isEmpty(pseudo)) {
            errors.push('Le champ pseudo est vide');
        };

        if (pseudo.length >= 13 || pseudo.length <= 2) {
            errors.push('Pseudo invalide (entre 3 et 12 caractères)');
        }; 

        if (errors.length) {
            return res.status(400).json({errors});
        };
        
        const userFound = await userDataMapper.findUser(email)

        if(!userFound) { 
             const salt = bcrypt.genSaltSync(10);
             const hash = bcrypt.hashSync(password, salt);
                    try {
                 
                         const newUser = await userDataMapper.newUser(firstName, lastName, email, hash, pseudo);
                         console.log(newUser);
                         
                         return res.status(200).json ({
                            'role': newUser.role,
                            'userId': newUser.id,
                            'first_name': newUser.first_name,
                            'last_name': newUser.last_name,
                            'email': newUser.email,
                            'pseudo': newUser.pseudo,
                            'isadmin': newUser.isadmin
                        });
                     
                    } catch (error) {
                         next(error);
                     }

         } else {
            return res.status(400).json({errors :['Cette adresse email existe déjà']});
         } 
    },
    login: async function(req, res, next) {
        
        const email = req.body.email;
        const password = req.body.password; 

        function isEmpty(str) {
            return !str.trim().length;
        }  

        const errors = [];

        if (isEmpty(email)) {
            errors.push('Le champ email est vide');
        }; 

        if (isEmpty(password)) {
            errors.push(`Le champ mot de passe est vide`);
        }; 

        if (errors.length) {
            return res.status(400).json({errors});
        }

        const user = await userDataMapper.findUser(email);
        
        if(new Date() >= new Date(user.sub_end * 1000)) {
            await userDataMapper.subscriberSet(email)
        }

        try {
            await userDataMapper.loginSet(email);
            const loginUser = await userDataMapper.loginUser(email);
            
            if (loginUser) {

                const match = await bcrypt.compare(password, loginUser.password);
                   console.log('match:', match) 

                const token = await jwtUtils.generateTokenForUser(loginUser); 

                       if(match) { 
    
                             res.cookie('token', token, {
                                 maxAge: 1000 * 60 * 60,
                                 httpOnly: true,
                                 secure: true,
                                 sameSite: 'None',
                               });
                            return res.status(200).json({
                                'token': token
                            });

                        

                       } else {
                        errors.push(`Mot de passe invalide`);
                        return res.status(400).json({errors});
                     }
                     
            } else {
                errors.push(`Utilisateur introuvale`);
                return res.status(400).json({errors});
                
            }
         } catch (error) {
            next(error);
        } 
        
        
        
    }, 

    logout: async function(req, res, next) {
        const userId = req.params.id
        
        try {
            await userDataMapper.logoutSet (userId)
            return res.status(200).json('logout');

        } catch (error) {
            next(error);
        }
    },

    getItem: async function (req, res, next) {
        const userId = req.params.id 
        try {  
            const item = await userDataMapper.getitem(userId);
            console.log('stringItem :', item);

            const jsonItem = JSON.parse(item.item); 
            console.log('JSON:', jsonItem)
            return res.json({ item: jsonItem });
        } catch (error) {
            next(error);
        }
    }
}
