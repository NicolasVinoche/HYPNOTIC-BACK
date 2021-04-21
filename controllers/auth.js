const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, '0fzdf42fgtdsz179dsgbd5674c468vshd9qsv525vqvhss4csf43vdsy5643svghr80vs2134vryzf419s');
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };