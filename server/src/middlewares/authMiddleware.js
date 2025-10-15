const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

module.exports = function authMiddleware(req, res, next) {
  const extractToken = () => {
    const authHeader = req.headers.authorization || '';
    return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  };

  const verifyToken = (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  };

  const accessToken = extractToken();
  if (accessToken) {
    const decoded = verifyToken(accessToken, JWT_SECRET);
    if (decoded) {
      res.locals.userId = decoded.userId;
      res.locals.user = decoded; // ← ДОБАВИЛ полную информацию о пользователе
      return next();
    }
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: 'Токен недействителен или истёк' });
  }

  res.locals.userId = decoded.userId;
  res.locals.user = decoded; // ← ДОБАВИЛ полную информацию о пользователе
  next();
};