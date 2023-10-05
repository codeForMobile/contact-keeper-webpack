import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth, logout } from '../../context/auth/AuthState'
import { useContacts, clearContacts } from '../../context/contact/ContactState'

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth()
  const {isAuthenticated, user} = authState

  const contactDispatch = useContacts()[1]

  const onLogout = () => {
    logout(authDispatch)
    clearContacts(contactDispatch)
  }
  
  const authLinks = (
    <Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <Link onClick={onLogout} href="/login">
          <i className="fas fa-sign-out-alt"/>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/about'>
        <i className={icon} /> { title }
        </Link>
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks }
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
}

export default Navbar