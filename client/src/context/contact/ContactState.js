import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        name: "John Doe",
        id: "1",
        email: "jdoe@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        name: "Sara Smith",
        id: "2",
        email: "ssmith@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        name: "Harri Williams",
        id: "3",
        email: "hwilliams@gmail.com",
        phone: "111-111-1111",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  }
  const [state,dispatch] = useReducer(contactReducer, initialState)

  // Add contact
  const addContact = contact => {
    contact.id = uuidv4()
    dispatch({ type: ADD_CONTACT, payload: contact})
  }

  // delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id})
  }

  // Update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact})
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
    addContact,
    deleteContact,
    updateContact,
    setCurrent,
    clearCurrent,
    filterContacts,
    clearFilter
  }}>
    {props.children}
  </ContactContext.Provider>
}

export default ContactState