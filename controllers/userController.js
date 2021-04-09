const bcrypt = require('bcrypt'); 
const { response } = require('express');
var jwt = require('jsonwebtoken'); 
const userDataMapper = require('../dataMappers/userDataMapper')

module.exports = {
    register: async function(req, res, error) { 
        
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password
        
        //TODO regex

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
                try {
            
                    const newUser = await userDataMapper.newUser(firstName, lastName, email, hash);
                    console.log(newUser)
                    res.json({data:newUser})
                } catch (error) {
                    console.log(error);
                }
        
        if (firstName == null || lastName == null || email == null || password == null) {
            return res.status(400).json({'error': error});
        } 

        
        
        // const userFound = await userDataMapper.findUser(userMail)
        // .then(function async (userFound) {
        //     if(!userFound) {
        //     }
        // })

    }, 

    login: function(req,res) {

    }
}
