import React from 'react'
import { NavLink } from 'react-router-dom'
import logoSvg from '../../images/1.svg'

export default function Faq() {
  return (
        <div className="my-auto w-100">
        <div className="d-flex flex-column" style={{ minHeight: "800px" }}>
            <NavLink style={{width:"100px"}} to="/"><img src={logoSvg} alt="logo" width="250" /></NavLink>
            <div className="my-auto ms-auto mx-auto w-100 text-center">
                <div className="text-center text-white mx-auto">
                    <p className='h1 text-center my-4'><b>Frequently Asked Questions</b></p>
                    <p className='h3 mt-5'><b>Payment</b></p>
                    <p className='h4'>We will take your card details, and send an email communication to confirm payment</p>
                    <p className='h3 mt-5'><b>Refunds</b></p>
                    <p className='h4'>We issue refunds on a case by case basis, please get in touch with customer service to discuss</p>
                    <p className='h3 mt-5'><b>Insurance</b></p>
                    <p className='h4'>We do not provide insurance, it is a risk it for the biscuit situation</p>
                    <p className='h3 mt-5'><b>Changes to your trip</b></p>
                    <p className='h4'>For any changes, please get in touch with customer service to discuss</p>
                </div>
            </div>
        </div>
        </div>

  )
}
