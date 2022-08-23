import React from 'react'
import logoSvg from '../../images/1.svg'
import {Link} from 'react-router-dom'


export default function Home() {
  return (
    <div className="my-auto" id="homeComponent">

    <div className="d-flex flex-column" style={{ minHeight: "600px" }}>

      <div className=""><img src={logoSvg} alt="InfiniSpace orange rocket logo" width="250px"></img></div>

      <div className="my-auto ms-auto mx-auto w-50">
        <p className='text-white h1 text-center my-4'><b>Welcome to InfiniSpace</b></p>
        <p className="text-white h4 my-0 text-center">
          At InfiniSpace, we pride ourselves for being the world’s leading company in commercial space travel. Join us to explore the wonders in our solar system, and experience new adventures, sights, and ways of living!
        </p>
        <p className='text-white text-lg h4 my-0 text-center'>
          Let us create an unforgettable experience for you.
        </p>
      </div>
        <Link role="button" className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3" style={{width: "220px" }} to="/map-page">Start Your Journey</Link>
    </div>
  </div>
  )
}


