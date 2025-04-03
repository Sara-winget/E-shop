import React from 'react'
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { NavLink , Routes, Route} from 'react-router-dom'
const Nav = () => {

  return (
    <nav className='flex justify-evenly'>
     <NavLink to={'/'} >

      home
     </NavLink>
     
     <NavLink to='/profile' >
      Profile
     </NavLink >
     <NavLink to={'/'}>{/* wishlist*/ }
     <FaHeart />
     </NavLink>
     <NavLink to={'/cart'}>
     <FaCartArrowDown />
     </NavLink>
      
    </nav>
  )
}

export default Nav
