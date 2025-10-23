const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
  const token = authHeader.split(' ')[1];
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    res.status(500);
    return next(new Error('JWT secret not configured'));
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user || decoded;
    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorized, token failed'));
  }
};

module.exports = validateToken;
