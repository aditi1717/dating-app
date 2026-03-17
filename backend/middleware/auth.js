import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check for token in cookies
  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

export const adminProtect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token && req.cookies) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Admin access required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Admin access required' });
  }
};

export const refreshTokenMiddleware = (req, res, next) => {
  let refreshToken;

  if (req.cookies) {
    refreshToken = req.cookies.refreshToken;
  }

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token not found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Refresh token expired' });
  }
};
