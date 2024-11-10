const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Access Denied');
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This should set the user's information
    next();
  } catch (err) {
    console.error('Invalid Token:', err);
    res.status(401).send('Invalid Token');
  }
};

module.exports = { authMiddleware };
