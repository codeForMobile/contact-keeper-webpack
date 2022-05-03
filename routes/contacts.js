const express = require('express')
const router = express.Router()

// @route   GET api/contacts
// @desc    Get all contacts of a user
// @access  Private
router.get('/', (req,res) => {
  res.send('Get all contacts')
})

// @route   POST api/contacts
// @desc    And new contact
// @access  Private
router.post('/', (req,res) => {
  res.send('Add contact')
})

// @route   PUT api/contacts/:id
// @desc    update contact
// @access  Private
router.put('/:id', (req,res) => {
  res.send('Update contact')
})

// @route   Delete api/contacts/:id
// @desc    delete contact
// @access  Private
router.delete('/:id', (req,res) => {
  res.send('delete contact')
})

module.exports = router