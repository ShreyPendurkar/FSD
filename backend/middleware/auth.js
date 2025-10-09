const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if token exists and is a Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  // Extract the actual token string
  const token = authHeader.substring(7, authHeader.length);
  
  try {
    // Verify token and get decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user data from token to request object
    req.user = decoded.user;
    
    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
