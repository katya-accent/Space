import React from 'react'
import logoSvg from '../../images/1.svg'
import { NavLink } from "react-router-dom";


export default function ContactUs() {
    return (
        <div className="my-auto w-100 ">
            <div className="d-flex flex-column">
                <NavLink style={{ width: "100px" }} to="/"><img src={logoSvg} alt="logo" width="250" /></NavLink>
                <div className="my-auto ms-auto w-100 text-center">
                    <div className="text-center text-white mx-auto" >
                        <p className='h1 text-center my-4'><b>Contact Us</b></p>
                        <p className='h4'> If you need any support with your booking, please contact us on:</p>
                        <p className='h3 mt-3'><b>Email:</b> blastoff@infinispace.com</p>
                        <p className='h3 mt-3'><b>Phone:</b> 1-800-12345</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
