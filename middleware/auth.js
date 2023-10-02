const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
  const token = req.header('x-auth-token')

  // if token not found
  if(!token) {
    return res.status(401).json({ msg : "token not found"})
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.user = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({ msg : "Invalid token"})
  }
}