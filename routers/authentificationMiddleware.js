const express = require('express');
const app = express(); 

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Accept');
   next();
 };
  app.use(allowCrossDomain);


module.exports = {
    /* Récupération du header bearer */
     extractBearerToken: async function (headerValue) {
        if (typeof headerValue !== 'string') {
            return false
        }

        const matches = headerValue.match(/(bearer)\s+(\S+)/i)
        return matches && matches[2]
    },

    /* Vérification du token */
    checkTokenMiddleware: async function (req, res, next) {
        // Récupération du token
        const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

        // Présence d'un token
        if (!token) {
            return res.status(401).json({ message: 'Error. Need a token' })
        }

        // Véracité du token
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Error. Bad token' })
            } else {
                return next()
            }
        })
    }
}