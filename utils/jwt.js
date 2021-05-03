var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id, 
      isAdmin: userData.isadmin,
      role: userData.role,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      pseudo: userData.pseudo,
      current_period_end: userData.sub_end,
      isLogged: userData.isLogged
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  } 
}