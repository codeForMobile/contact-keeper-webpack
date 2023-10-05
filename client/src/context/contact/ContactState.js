import React, { useContext, useReducer } from 'react'
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

export const useContacts = () => {
  const {state, dispatch} = useContext(ContactContext)
  return [state, dispatch]
}

  // Get contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts')
    dispatch({type: GET_CONTACTS, payload: res.data})
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
  }
}

// Add contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact)
    dispatch({
      type: ADD_CONTACT, payload: res.data
    })
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
  } 
}

// delete contact
export const deleteContact = async (dispatch, _id) => {
  try {
    await axios.delete(`/api/contacts/${_id}`)
    dispatch({ type: DELETE_CONTACT, payload: _id})
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
  } 
}

// Update contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact)
    dispatch({ type: UPDATE_CONTACT, payload: res.data})
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg})
  }
}

// delete contact
export const clearContacts = (dispatch) => {
dispatch({ type: CLEAR_CONTACTS })
}

// Set current
export const setCurrent = (dispatch, contact) => {
dispatch({ type: SET_CURRENT, payload: contact})
}

// Clear current
export const clearCurrent = (dispatch) => {
dispatch({ type: CLEAR_CURRENT })
}

// Filter contacts
export const filterContacts = (dispatch,text) => {
dispatch({ type: FILTER_CONTACTS, payload: text})
}

// Clear Filter
export const clearFilter = (dispatch) => {
dispatch({ type: CLEAR_FILTER })
}

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null, 
  }
  const [state,dispatch] = useReducer(contactReducer, initialState)

  return <ContactContext.Provider
  value={{state: state, dispatch}}>
    {props.children}
  </ContactContext.Provider>
}

export default ContactState