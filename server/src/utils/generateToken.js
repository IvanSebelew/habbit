const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
} = process.env;

module.exports = function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES  });
  // console.log('accessToken:', accessToken )
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES });
  // console.log('refreshToken:', refreshToken )
  return { accessToken, refreshToken };
};

