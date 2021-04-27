const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser'); 



module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header Authorization de la requête, on split pour récuperer tout après l'espace
    const token = req.cookies.token;
    console.log('cookies:', req.cookies);
    // On décode let token
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    // On extrait l'ID utilisateur dans le token
    const userId = decodedToken.userId;
    // On vérifie si ID utilisateur de la demande et on le compare à celui du token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
