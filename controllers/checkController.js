const jwt = require('jsonwebtoken'); 

module.exports = {
    
    check: async function(req, res, next) {
        try {
            // On récupère le token (cookie-parser dans le app)
            const token = req.cookies.token;
            console.log('COOKIE:', req.cookies.token);
            // On décode let token
            const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
            console.log('decodedToken:', decodedToken)
            // On extrait l'ID utilisateur dans le token
            const userId = decodedToken.userId;
            // On vérifie si ID utilisateur de la demande et on le compare à celui du token
            console.log('userId :', userId)
            if (!userId) {
              throw 'Invalid user ID';
            } else {
              res.json({'decodedToken': decodedToken})
            }
        }   catch {
            res.status(401).json({
              error: new Error('Invalid request!'),
            });
        }
    }

}