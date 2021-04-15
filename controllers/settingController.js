const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt'); 
const settingDataMapper = require('../dataMappers/settingDataMapper'); 

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
            errors.push(`missing password`);
        }; 

        if (!regex_password.test(password)) {
            errors.push('password invalid (must length 5 - 20 and include 1 number at least)');
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
                    errors.push(`invalid password`);
                    return res.status(400).json({errors}); 
                }
            }

        } catch(error) {
            next(error);
        }

    }
}