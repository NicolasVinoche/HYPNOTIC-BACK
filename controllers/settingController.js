const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt'); 
const settingDataMapper = require('../dataMappers/settingDataMapper'); 
const packDataMapper = require('../dataMappers/packDataMapper');

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
                        errors.push(`missing password`);
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
                
                                const userSetting = await settingDataMapper.updatePseudo(pseudo, userId);
                        
                                    return res.status(200).json({ 'pseudo': userSetting.pseudo});
                                } else { 
                                errors.push(`invalid password`);
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
                            errors.push(`missing password`);
                        };
                
                        if (!regex_password.test(password)) {
                            errors.push('password invalid (must length 5 - 20 and include 1 number at least)');
                        };
                        
                        if (confirmPassword !== password) {
                            errors.push('password confimation not correct');
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
                                    errors.push(`invalid password`);
                                    return res.status(400).json({errors});
                                }
                            }
                            
                        } catch(error) {
                            next(error);
                        }
                    }; 
                    
                    if (!regex_password.test(password)) {
                        errors.push('password invalid (must length 5 - 20 and include 1 number at least)');
                    };
                    
                    if (confirmPassword !== password) {
                        errors.push('password confimation not correct');
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
                    
                },

    newPack: async function(req, res, next) {
                    title = req.body.title;
                    description = req.body.description;
                    price = req.body.price;
                    tag = req.body.tag;
                    file = req.body.file;     

                    try {

                        var AWS = require('aws-sdk'); 
            
                        var creds = new AWS.Credentials({
                        accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
                        });
            
                        // Create S3 service object
                        s3 = new AWS.S3({apiVersion: '2006-03-01', 
                                        credentials: creds});
                        var bucketParams = {
                        Bucket : 'hypnotic-peafowl'
                        }; 
            
                        // call S3 to retrieve upload file to specified bucket
                        var uploadParams = {Bucket: 'hypnotic-peafowl/images', 
                                            Key: 'Pandoras Box_Full_Layer', 
                                            ACL: "public-read-write", 
                                            };
                        var file = file;
                        var fs = require('fs');
                        var fileStream = fs.createReadStream(file);
                        fileStream.on('error', function(err) {
                        console.log('File Error', err);
                        });
                        uploadParams.Body = fileStream;
                        var path = require('path');
                        uploadParams.Key = path.basename(file);
            
                        // call S3 to retrieve upload file to specified bucket
                        
                        s3.upload (uploadParams, async function (err, data) {
                        
                        
                        if (err) {
                            console.log("Error", err);
                        } if (data) {
                            console.log("Upload Success", data);
        
                            const newpack = await packDataMapper.insertPack(title, description, price, tag, data.Location);
                            console.log(newpack); 
                        }
                        }); 

                           } catch (error) {
                            
                            next(error);
                            
                            }
                }            
}    
            
            