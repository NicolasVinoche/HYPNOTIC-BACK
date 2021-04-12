 
// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0fzdf42fgtdsz179dsgbd5674c468vshd9qsv525vqvhss4csf43vdsy5643svghr80vs2134vryzf419s';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  }
}