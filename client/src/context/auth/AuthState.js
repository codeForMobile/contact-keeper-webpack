import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

  export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext)
    return [state, dispatch]
  }

  // Load user
  export const loadUser = async (dispatch) => {
    try {
      const res = await axios.get('/api/auth')
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register user
  export const register = async (dispatch,formData) => {
    try {
      const res = await axios.post('/api/users', formData)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })

      loadUser(dispatch)
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // Login user
  export const login = async (dispatch, formData) => {
    try {
      const res = await axios.post('/api/auth', formData)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })

      loadUser(dispatch)
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // Logout
  export const logout = async (dispatch) => {
    const res = await axios.get('/api/auth/logout')
    dispatch({ type: LOGOUT })
  }

  // Clear Errors
  export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS })

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  // load user on first run or on refresh
  if (state.loading) {
    loadUser(dispatch)
  }

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthState
