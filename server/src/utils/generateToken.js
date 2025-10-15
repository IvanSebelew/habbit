const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES = '15m',
  JWT_REFRESH_EXPIRES = '7d',
} = process.env;

module.exports = function generateTokens(user) {
  const payload = { 
    userId: user.id, 
    role: user.role 
  };
  
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES });
  
  return { accessToken, refreshToken };
};