import React, { useState, useEffect} from 'react'
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState'

const initialState = {
  name: '',
  email: '',
  phone: '',
  type: 'personal'
}

const ContactForm = () => {
  const [contactState, contactDispatch]= useContacts()
  const {current} = contactState
  const [contact, setContact] = useState(initialState)

  useEffect(() => {
    if(current !==null) {
      setContact(current)
    } else {
      setContact(initialState)
    }
  }, [current])
  
  const {name, email, phone, type } = contact
  const onChange = e => setContact({...contact, [e.target.name]: e.target.value})
  const clearAll = () => {
    clearCurrent(contactDispatch)
  }
  const onSubmit = e => {
    e.preventDefault()
    if(current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialState)
      )
    } else {
      updateContact(contactDispatch,contact)
    }
    clearAll()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
      {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input type="text" placeholder='Name' name='name' value={name} onChange={onChange}/>
      <input type="email" placeholder='Email' name='email' value={email} onChange={onChange}/>
      <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
      <h5>Contact Type</h5>
      <input type="radio" name="type" value='personal' checked={type === 'personal'} onChange={onChange}/>Personal{' '}
      <input type="radio" name="type" value='professional' checked={type === 'professional'} onChange={onChange}/>Professional
      <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
      {current && <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button> }
    </form>
  )
}

export default ContactForm