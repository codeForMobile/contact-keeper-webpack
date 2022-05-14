import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const text = useRef('')

  useEffect(() => {
    if(contactContext.filtered === null) {
      text.current.value = ''
    }
  })
  const onChange= e => {
    if(e.target.value !== '') {
      contactContext.filterContacts(e.target.value)
    } else {
      contactContext.clearFilter()
    }
  }

  return (
    <form>
      <input type="text" placeholder="Enter search term..." ref={text} onChange={onChange}/>
    </form>
  )
}

export default ContactFilter