import React from 'react'
import { useState } from 'react'
import './BookingForm.css'
import { numberWithCommas, capitalise } from '../../helpers'
import { useHistory } from "react-router-dom";
import { fetchOrderByID } from "../../handlers.js"

export default function Booking() {

    const [id, setId] = useState("")
    const [state, setState] = useState(null)

    const orderIdHandleSubmit = async (e) => {
        e.preventDefault()
        const data = await fetchOrderByID(id)
        setState(data[0])
    }

    // eslint-disable-next-line
    const history = useHistory();


    function handleBackButton(e) {
        e.preventDefault()
        history.push('/select-journey')
    }



    return (
        <div className='w-100 my-auto text-white'>
            <div className="mx-auto d-flex flex-column">


                {
                    state &&
                    <div className=' mx-auto d-flex flex-column'>
                        <div className="journey-summary-box text-black text-center fs-5 border py-2 rounded-5 justify-content-center d-flex flex-column" style={{ backgroundColor: "#F1E0D4", marginTop: '120px' }}>
                            <p className='text-orange h3 m-2'>Your Booking Summary</p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Name of the Lead Passenger: </span><span>{state.full_name}</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Total Number of Passengers: </span><span>{state.passengers}</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Contact Email: </span><span>{state.email_address}</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Dates: </span><span>{state.departure_date.slice(0, 10).replaceAll('-', '/')}</span><span className='text-orange'> to </span>{state.return_date.slice(0, 10).replaceAll('-', '/')}<span></span></p>

                            <div className='h6 my-2 mx-4'>
                                <p><span className='text-orange'>Departure From: </span><span>{capitalise(state.departure_planet)}</span></p>
                                <p><span className='text-orange'>Destination: </span><span>{capitalise(state.arrival_planet)}</span></p>
                            </div>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>What is included: </span><span>3 Meals a day, mini-fridge,internet connection, en-suite bathroom & laundry service</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Upgrades: </span><span>{capitalise(state.upgrades)}</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Total Journey Price: </span><span data-testid='display-price' className='text-center h3 mt-0s'>£{numberWithCommas(state.journey_price + state.extras_price)}</span></p>

                            <p className='h6 my-2 mx-4'><span className='text-orange'>Included Upgrades Price: </span><span data-testid='display-price' className='text-center h3 mt-0s'>£{numberWithCommas(state.extras_price)}</span></p>
                        </div>
                        <div className="d-flex justify-content-center">

                        </div>

                    </div>
                }
            </div>
            <form onSubmit={orderIdHandleSubmit}>
                <h3 className="text-center">Enter Order ID</h3>
                <input type="text" required className="Booking-form-input w-10 mx-auto d-flex rounded-pill text-center my-3"  onChange={(e) => {
                    setId(e.target.value);
                }} />
                <div className='mt-3' style={{ height: '15px' }}>
                    {state===undefined && <p className='text-warning text-center'>Couldn't find a booking with this ID</p>}
                </div>
                <div className="d-flex justify-content-center">
                    <div onClick={handleBackButton} className="btn btn-orange rounded-pill my-3 mx-5" to="/display-journey">Back</div>
                    <button type="submit" className="btn btn-orange rounded-pill my-3 mx-5" to="/">Submit</button>
                </div>
            </form>
        </div>
    )

}
