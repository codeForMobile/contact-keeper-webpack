const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const Contact = require('../models/Contact')
const auth = require('../middleware/auth')

// @route   GET api/contacts
// @desc    Get all contacts of a user
// @access  Private
/**
 * Get all contacts of a user
 * @async
 * @name  /api/contacts
 */
router.get('/', auth, async (req,res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1 })
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!!')
  }
})

// @route   POST api/contacts
// @desc    And new contact
// @access  Private
router.post('/', [ auth, [
  body('name', 'name is required').not().isEmpty(),
]], async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(404).json({ errors : errors.array()})
  }

  const { name, email, phone, type } = req.body
  try {
    const newContact = new Contact({
      name,
      email,
      phone, 
      type,
      user: req.user.id
    })

    const contact = await newContact.save()
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error!!')
  }
})

// @route   PUT api/contacts/:id
// @desc    update contact
// @access  Private
router.put('/:id', auth, async (req,res) => {
  const { name, email, phone, type } = req.body
  const contactFields = {}

  if(name) contactFields.name = name
  if(email) contactFields.email = email
  if(phone) contactFields.phone = phone
  if(type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).json({ msg : 'contact not found!!'})

    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg : 'Not authorized!!'})
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: contactFields},
      { new: true})

    res.json(contact)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error!!')
  }
})

// @route   Delete api/contacts/:id
// @desc    delete contact
// @access  Private
router.delete('/:id', auth, async (req,res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).json({ msg : 'contact not found!!'})

    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg : 'Not authorized!!'})
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg : "Contact removed!!"})
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error!!')
  }
})

module.exports = router