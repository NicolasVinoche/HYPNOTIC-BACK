const bcrypt = require('bcrypt');  
var jwtUtils = require('../utils/jwt'); 
var cookieParser = require('cookie-parser');
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
            return res.status(400).json({errors :['this email already exist']});
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
            errors.push('missing email');
        }; 

        if (isEmpty(password)) {
            errors.push(`missing password`);
        }; 

        if (errors.length) {
            return res.status(400).json({errors});
        }

        
        try {
            const loginUser = await userDataMapper.loginUser(email)
            //console.log(loginUser)
            
            if (loginUser) {
                const match = await bcrypt.compare(password, loginUser.password);
                   console.log('match:', match) 

                const token = await jwtUtils.generateTokenForUser(loginUser); 

                console.log(token); 


                       if(match) { 
                            // res.cookie("jwt", token, {
                            //    expires: new Date(Date.now() + 6000), 
                            //    httpOnly: true, 
                            //    sameSite: 'strict'
                           
                            // });  
                            cookieParser.JSONCookie ("jwt", token, {
                                expires: new Date(Date.now() + 6000), 
                                 httpOnly: true, 
                                 sameSite: 'strict'
                            
                             })
                            
                            
                           
                        return res.status(200).json({
                            'role': loginUser.role,
                            'userId': loginUser.id,
                            'first_name': loginUser.first_name,
                            'last_name': loginUser.last_name,
                            'email': loginUser.email,
                            'pseudo': loginUser.pseudo, 
                            'isadmin': loginUser.isadmin,
                            'token': jwtUtils.generateTokenForUser(loginUser), 
                            'cookie': cookieParser.JSONCookie ("jwt", token, {
                                   expires: new Date(Date.now() + 6000), 
                                    httpOnly: true, 
                                    sameSite: 'strict'
                               
                                })
                        });  
                        
                           
                       } else {
                        errors.push(`invalid password`);
                        return res.status(400).json({errors});
                     }
                     
            } else {
                errors.push(`Utilisateur introuvale`);
                return res.status(400).json({errors});
                
            }
         } catch (error) {
            next(error);
        } 
        
    }
}
