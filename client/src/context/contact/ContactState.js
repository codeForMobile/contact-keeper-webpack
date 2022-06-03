import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null, 
  }
  const [state,dispatch] = useReducer(contactReducer, initialState)

  // Get contacts
    const getContacts = async () => {
      try {
        const res = await axios.get('/api/contacts')
        dispatch({
          type: GET_CONTACTS, payload: res.data
        })
      } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
      } 
    }

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({
        type: ADD_CONTACT, payload: res.data
      })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
    } 
  }

  // delete contact
  const deleteContact = async _id => {
    try {
      await axios.delete(`/api/contacts/${_id}`)
      dispatch({ type: DELETE_CONTACT, payload: _id})
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
    } 
  }

  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({ type: UPDATE_CONTACT, payload: res.data})
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
    }
  }

  // delete contact
  const clearContacts = id => {
    dispatch({ type: CLEAR_CONTACTS })
  }

  // Set current
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact})
  }

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text})
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return <ContactContext.Provider
  value={{
    contacts: state.contacts,
    current: state.current,
    filtered: state.filtered,
    error: state.error,
    getContacts,
    addContact,
    deleteContact,
    updateContact,
    setCurrent,
    clearCurrent,
    filterContacts,
    clearFilter,
    clearContacts
  }}>
    {props.children}
  </ContactContext.Provider>
}

export default ContactState