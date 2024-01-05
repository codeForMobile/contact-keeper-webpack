const jwt = require('jsonwebtoken')

const generateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: '60m'
      })

    res.cookie('jwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60
    })

    return token
}

module.exports = generateToken