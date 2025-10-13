const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

module.exports = function authMiddleware(req, res, next) {
  
  const hdr = req.headers.authorization || '';
  const accessToken = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;

  
  if (accessToken) {
    try {
      const { userId } = jwt.verify(accessToken, JWT_SECRET);
      res.locals.userId = userId;
      return next();
    } catch (err) {
      
    }
  }

 
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  try {
    
    const { userId } = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    res.locals.userId = userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Токен недействителен или истёк' });
  }
};