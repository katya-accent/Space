import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import logoSvg from '../../images/1.svg'
import './Navbar.css'

export default function Navbar() {

  const { pathname } = useLocation();
  
  return (
    <div className="navbar nav-pills rounded d-flex align-items-start nav-fill">
      <div className="container">
        <div className='mx-auto mx-sm-0'>
          {!((pathname === "/") || (pathname==="/about-us") || (pathname==="/faq") || (pathname==="/contact-us")) && <NavLink to="/"><img src={logoSvg} alt="logo" width="120" /></NavLink>}
        </div>
        <div className='align-self-start d-flex flex-nowrap'>
          <NavLink to="/about-us" className={isActive => " btn text-light navlink-button rounded-pill mx-2 " + (isActive && "navlink-border-orange")}>
            About Us
          </NavLink>
          <NavLink to="/contact-us" className={isActive => " btn text-light navlink-button rounded-pill mx-2 " + (isActive && "navlink-border-orange")}>
            Contact Us
          </NavLink>
          <NavLink to="/faq" className={isActive => " btn d-flex text-light navlink-button rounded-pill mx-2 " + (isActive && "navlink-border-orange")}>
            <p className='my-auto'>Faq</p>
          </NavLink>
          <NavLink to="/booking-lookup" className={isActive => " btn text-light navlink-button rounded-pill mx-2 " + (isActive && "navlink-border-orange")}>
            Booking Lookup
          </NavLink>
        </div>
      </div>
    </div>
  )
}


