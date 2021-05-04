const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt'); 
const settingDataMapper = require('../dataMappers/settingDataMapper'); 
const packDataMapper = require('../dataMappers/packDataMapper');
const trackDataMapper = require('../dataMappers/tracksDataMapper');

const regex_password = /^(?=.*\d).{5,20}$/;

module.exports = {
    
    updateUser: async function(req, res, next) {
        const userId = req.params.id;
                    const pseudo = req.body.pseudo;
                    const password = req.body.password; 
                    const confirmPassword = req.body.confirmPassword; 
                    const oldPassword = req.body.oldPassword;
                    
                    function isEmpty(str) {
                        return !str.trim().length;
                    } 
                
                    const errors = []; 
                    
                    if (isEmpty(password)) {
                        
                        function isEmpty(str) {
                        return !str.trim().length;
                    } 
                
                    const errors = [];
                    
                    if (isEmpty(oldPassword)) {
                        errors.push(`Le champ mot de passe est vide`);
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
                    
                    try {
                        const validationUser = await settingDataMapper.findPassword(userId);
                        console.log('validationUser :', validationUser);
                        if(validationUser) {
                            const match = await bcrypt.compare(oldPassword, validationUser.password);
                            console.log('match:', match)
                            if(match) {
                
                                const userSetting = await settingDataMapper.updatePseudo(pseudo, userId);
                        
                                    return res.status(200).json({ 'pseudo': userSetting.pseudo});
                                } else { 
                                errors.push(`Mot de passe incorrect`);
                                return res.status(400).json({errors});
                            }
                        }
                
                    } catch(error) {
                        next(error);
                        }
                    } else if (isEmpty(pseudo)) {
                        function isEmpty(str) {
                            return !str.trim().length;
                        }
                
                        const errors = [];
                
                        if (isEmpty(password)) {
                            errors.push(`Le champ mot de passe est vide`);
                        };
                
                        if (!regex_password.test(password)) {
                            errors.push('Mot de passe invalide (entre 5 et 20 caractères avec au moins 1 chiffre)');
                        };
                        
                        if (confirmPassword !== password) {
                            errors.push('Les deux mots de passe ne correspondent pas');
                        };
                
                        if (errors.length) {
                            return res.status(400).json({errors});
                        };
                        
                        try {
                            const validationUser = await settingDataMapper.findPassword(userId);
                            console.log('validationUser :', validationUser);
                            if(validationUser) {
                                const match = await bcrypt.compare(oldPassword, validationUser.password);
                                console.log('match:', match)
                                if(match) {
                                    const salt = bcrypt.genSaltSync(10);
                                    const hash = bcrypt.hashSync(password, salt);
                                    
                                    const userSetting = await settingDataMapper.updatePassword(hash, userId);
                            
                                    return res.status(200).json({ 'id': userSetting.id});
                                } else {
                                    errors.push(`Mot de passe incorrect`);
                                    return res.status(400).json({errors});
                                }
                            }
                            
                        } catch(error) {
                            next(error);
                        }
                    }; 
                    
                    if (!regex_password.test(password)) {
                        errors.push('Mot de passe invalide (entre 5 et 20 caractères avec au moins 1 chiffre)');
                    };
                    
                    if (confirmPassword !== password) {
                        errors.push('Les deux mots de passe ne correspondent pas');
                    };
                    
                    
                    if (pseudo.length >= 13 || pseudo.length <= 2) {
                        errors.push('Pseudo invalide (entre 3 et 12 caractères)');
                    }; 
                
                    if (errors.length) {
                        return res.status(400).json({errors});
                    };
                
                    try {
                        const validationUser = await settingDataMapper.findPassword(userId); 
                        console.log('validationUser :', validationUser);
                        if(validationUser) {
                            const match = await bcrypt.compare(oldPassword, validationUser.password);
                            console.log('match:', match)
                            if(match) {
                                const salt = bcrypt.genSaltSync(10);
                                const hash = bcrypt.hashSync(password, salt);
                
                                const userSetting = await settingDataMapper.updateUser(pseudo, hash, userId); 
                        
                                return res.status(200).json({ 'pseudo': userSetting.pseudo}); 
                            } else { 
                                errors.push(`Mot de passe incorrect`);
                                return res.status(400).json({errors}); 
                            }
                        }
                        
                    } catch(error) {
                        next(error);
                    }

    }
}        