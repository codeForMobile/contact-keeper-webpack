import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import { useAuth, clearErrors, login } from '../../context/auth/AuthState'
import ReCAPTCHA from "react-google-recaptcha";

const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext
  const [captcha, setCaptcha] = useState(false)
  
  const [authState, authDispatch] = useAuth()
  const { error, isAuthenticated } = authState

  useEffect(() => {
    if(error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors(authDispatch)
    }
  }, [error, isAuthenticated, authDispatch, setAlert])
  
  const [user, setUser] = useState({
    email:'',
    password:'',
  })

  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value})
  
  const onSubmit = e => {
    e.preventDefault()
    if(email === '' || password === ''){
      setAlert('Please fill in all fields', 'danger')
    } else if (captcha === false) {
      setAlert('Please complete captcha validation', 'danger')
    } else {
      login(authDispatch, {
        email,
        password
      })
    }
  }

  const onCaptchaHandler = _ => {
    setCaptcha({ captcha: true})
  }

  if (isAuthenticated) return <Navigate to='/'/>

  return (
    <div className='form-container'>
      <h1>
        Account <span className="text-primary">Login</span> </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={email} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={password} onChange={onChange}/>
          </div>
          <div >
            <ReCAPTCHA className='captcha'
            sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            onChange={onCaptchaHandler}
            />
          </div>
          <input
          type="submit"
          value="Login"
          className='btn btn-primary btn-block'
          />
        </form>
    </div>
  )
}

export default Login