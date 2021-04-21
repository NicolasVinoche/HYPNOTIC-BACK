var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0fzdf42fgtdsz179dsgbd5674c468vshd9qsv525vqvhss4csf43vdsy5643svghr80vs2134vryzf419s';

module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id, 
      isAdmin: userData.isadmin,
      role: userData.role,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      pseudo: userData.pseudo
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  } 
}