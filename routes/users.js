const bcrypt = require('bcryptjs');
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @route   POST api/users
// @desc    Register a user
// @access  public
router.post('/', [
  body('name', 'name is required').not().isEmpty(),
  body('email', 'Email is required').isEmail(),
  body('password', 'Password should be of length 6').isLength({ min: 6 })
], async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(404).json({ errors : errors.array()})
  }

  const { name, email, password } = req.body
  try {
    let user = await User.findOne({email})
    if(user) {
      return res.status(400).json({ msg : 'User already exists'})
    }

    user = new User({
      name,
      email,
      password
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    const createdUser = await user.save()

    const payload = {
      user : {
        id: user.id
      }
    }
    generateToken(res, payload)
    res.status(201).json({
      msg: 'register success'
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router