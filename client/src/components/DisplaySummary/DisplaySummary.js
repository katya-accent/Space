import React from 'react'
import { Link } from 'react-router-dom'
import Planet from '../Planet/Planet'
import infiniSign from '../../images/infiniSign.png'
import './DisplaySummary.css'
import {numberWithCommas , capitalise} from '../../helpers.js'


export default function DisplaySummary({state}) {

  if(!state.departurePlanet) {
    return (
    <div className='text-center p-2 rounded-3 d-flex flex-column mx-auto my-auto text-white background-cream'>
      <p className='text-orange p-2'>Could not retrieve journey details - please search again</p>
      <Link  className="btn btn-dark mx-auto mb-2" to="/select-journey">Search</Link>
    </div>)
  }

  return(
  <div className="my-auto d-flex flex-column w-75 mx-auto justify-content-center" >
     <div className="d-flex flex-column" >
      <h2 className='text-white text-center'>Your Journey Summary</h2>
       <div className="planets-container ms-auto mx-auto w-100 d-flex">
            <div className="w-50 my-auto d-flex flex-column">
            <Planet planetName={state.departurePlanet} />
            <h3 className='text-white planet-name mx-auto'>{capitalise(state.departurePlanet)}</h3>
            </div>
            <div className='infini-sign my-auto w-50 mx-1'>
              <img className='img-fluid' src={infiniSign} alt="infinity sign" />
            </div>
            <div className="my-auto w-50 d-flex flex-column">
            <Planet planetName={state.destinationPlanet} />
            <h3 className='text-white mx-auto planet-name'>{capitalise(state.destinationPlanet)}</h3>
            </div>
        </div>
         <div className="journey-summary-box text-black text-center fs-5 border py-2 rounded-5 justify-content-center d-flex flex-column" style={{backgroundColor: "#F1E0D4"}}>
          <p className='h6 my-2 mx-4'><span className='text-orange'>Dates: </span><span>{state.departureDate.slice(0,10).replaceAll('-','/')}</span><span className='text-orange'> to </span>{state.returnDate.slice(0,10).replaceAll('-','/')}<span></span></p>
          <p className='h6 my-2 mx-4'><span className='text-orange'>Price: </span><span>£{numberWithCommas(state.totalPrice)}</span></p>
          <p className='h6 my-2 mx-4'><span className='text-orange'>Destination: </span><span>{capitalise(state.destinationPlanet)}</span></p>
          <p className='h6 my-2 mx-4'><span className='text-orange'>Distance: </span><span>{state.distance.toFixed(3)} AU</span></p>
          <p className='h6 my-2 mx-4'><span className='text-orange'>Passengers: </span><span>{state.passengers}</span></p>
          <p className='h6 my-2 mx-4'><span className='text-orange'>What is included: </span><span>3 Meals a day, mini-fridge,internet connection, en-suite bathroom & laundry service</span></p>
         </div>
       </div>
       <div className="d-flex justify-content-end">
        <Link className="btn btn-orange rounded-pill me-2 mt-5 mb-3" to="/select-journey">Back</Link>
        <Link className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3" to="/add-upgrades">Next</Link>
       </div>
     </div>
  )
}
