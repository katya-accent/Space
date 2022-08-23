
import React from 'react'
import { numberWithCommas, capitalise } from '../../helpers'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import './PaymentForm.css'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'

export default function PaymentForm({ state, setState, handlePaymentSubmit }) {
    // eslint-disable-next-line
    const history = useHistory();

    if (Object.keys(state).length === 0) {
        return (
            <div className='text-center p-2 rounded-3 d-flex flex-column mx-auto my-auto text-white background-cream'>
                <p className='text-orange p-2'>Could not retrieve journey details - please search again</p>
                <Link className="btn btn-dark mx-auto mb-2" to="/select-journey">Search</Link>
            </div>)
    } else {
        // eslint-disable-next-line
        const [fullName, setFullName] = useState("");
        // eslint-disable-next-line
        const [address, setAddress] = useState("");
        // eslint-disable-next-line
        const [phoneNumber, setPhoneNumber] = useState("");
        // eslint-disable-next-line
        const [email, setEmail] = useState("");
        // eslint-disable-next-line
        const [cardDetails, setCardDetails] = useState("")

        const trueExtras = [];
        // eslint-disable-next-line
        for (const [_, value] of Object.entries(state.upgrades)) {
            if (value.selected === true) trueExtras.push(value.shorthand)
        }



        // handle submit export to handlers and decide how to 
        async function handleNextButton(e) {
            e.preventDefault()
            let genId = uuidv4();


            //fetch POST request
            await handlePaymentSubmit(phoneNumber, genId, state.totalPrice, state.extrasTotal, state.departurePlanet, state.destinationPlanet, state.departureDate, state.returnDate, fullName, address, email, cardDetails, trueExtras, state.passengers)

            setState(previousState => {
                const newState = { ...previousState }
                newState.fullName = fullName;
                newState.address = address;
                newState.phoneNumber = phoneNumber;
                newState.email = email;
                newState.cardDetails = cardDetails;
                newState.id = genId;
                return newState
            })

            history.push('/booking-confirmation')
        }

        function handleBackButton(e) {
            e.preventDefault()
            history.push('/add-upgrades')
        }


        return (

            <div className='w-100 my-auto text-white'>
                <form onSubmit={handleNextButton}>
                    <div className="mx-auto d-flex flex-column flex-lg-row">

                        <div className="d-flex my-auto mx-auto flex-column">
                            <div className=' mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <h3 className="text-left">Your Details</h3>
                            </div>
                            <div className=' mx-auto mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <label htmlFor="fullname" className="text-white text-lg fs-5 mx-4 my-auto">
                                    Full name
                                </label>
                                <input  type="text" pattern=".{3,}" placeholder="name surname" required className="Payment-form-input w-10 mx-auto rounded-pill text-center" onChange={(e) => {
                                    setFullName(e.target.value);
                                }} />
                            </div>

                            <div className=' mx-auto mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <label htmlFor="address" className="text-white text-lg fs-5 mx-4 my-auto">
                                    Address
                                </label>
                                <input  type="text" pattern=".{8,}" placeholder="contact address" required className="Payment-form-input w-10 mx-auto rounded-pill text-center" onChange={(e) => {
                                    setAddress(e.target.value);
                                }} />
                            </div>


                            <div className=' mx-auto mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <label htmlFor="phone number" className="text-white text-lg fs-5 mx-4 my-auto">
                                    Phone Number
                                </label>
                                <input  type="number" pattern=".{5,}" placeholder="0712 345 6789" required className="Payment-form-input w-10 mx-auto rounded-pill text-center" onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }} />
                            </div>


                            <div className=' mx-auto mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <label htmlFor="email" className="text-white text-lg fs-5 mx-4 my-auto">
                                    E-mail
                                </label>
                                <input type="email" placeholder="email@provider.domain" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email!" required className="Payment-form-input w-10 mx-auto rounded-pill text-center" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>

                            <div className=' mx-auto mb-5 lg-my-0 d-flex flex-row Payment-form-input-group'>
                                <label htmlFor="card details" className="text-white text-lg fs-5 mx-4 my-auto">
                                    Card details
                                </label>
                                <input type="number" inputmode="numeric" pattern="[0-9\s]{13,19}" required placeholder="xxxx xxxx xxxx xxxx" className="Payment-form-input w-10 mx-auto rounded-pill text-center" onChange={(e) => {
                                    setCardDetails(e.target.value);
                                }} />
                            </div>
                        </div>



                        <div className=' mx-auto d-flex flex-column' style={{ maxWidth: '300px', marginTop: '-90px' }}>
                            <div className="journey-summary-box text-black text-center fs-5 border py-2 rounded-5 justify-content-center d-flex flex-column" style={{ backgroundColor: "#F1E0D4", marginTop: '120px' }}>
                                <p className='text-orange h3 m-2'>Your Journey Summary</p>
                                <p className='h6 my-2 mx-4'><span className='text-orange'>Dates: </span><span>{state.departureDate.slice(0, 10).replaceAll('-', '/')}</span><span className='text-orange'> to </span>{state.returnDate.slice(0, 10).replaceAll('-', '/')}<span></span></p>
                                <p className='h6 my-2 mx-4'><span className='text-orange'>Destination: </span><span>{capitalise(state.destinationPlanet)}</span></p>
                                <p className='h6 my-2 mx-4'><span className='text-orange'>Distance: </span><span>{state.distance.toFixed(3)} AU</span></p>
                                <p className='h6 my-2 mx-4'><span className='text-orange'>Passengers: </span><span>{state.passengers}</span></p>
                                <p className='h6 my-2 mx-4'><span className='text-orange'>What is included: </span><span>3 Meals a day, mini-fridge,internet connection, en-suite bathroom & laundry service</span></p>
                                <div className='h6 my-2 mx-4'><span className='text-orange'>Upgrades: </span>
                                    <p className='my-0'>{state.upgrades && state.upgrades.spacesuit && state.upgrades.spacesuit.selected && state.upgrades.spacesuit.name}</p>
                                    <p className='my-0'>{state.upgrades && state.upgrades.reel && state.upgrades.reel.selected && state.upgrades.reel.name}</p>
                                    <p>{state.upgrades && state.upgrades.spacerock && state.upgrades.spacerock.selected && state.upgrades.spacerock.name}</p>
                                </div>
                            </div>
                            <p className='text-center h3 mt-4'>Total Price:</p>
                            <p data-testid='display-price' className='text-center h3 mt-0s'>£{numberWithCommas(state.totalPrice + state.extrasTotal)}</p>
                            <div className="d-flex justify-content-end">
                                <div onClick={handleBackButton} className="btn btn-orange rounded-pill me-2 mt-5 mb-3" to="/display-journey">Back</div>
                                <button type='submit' className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3" to="/">Next</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
}
