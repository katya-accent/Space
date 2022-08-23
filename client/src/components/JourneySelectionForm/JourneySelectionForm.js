import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";


export default function JourneySelectionForm({ setState, state, handleSubmit }) {

    const history = useHistory();

    const [departurePlanet, setDeparturePlanet] = useState(state.departurePlanet || "");
    const [arrivalPlanet, setArrivalPlanet] = useState(state.destinationPlanet || "");
    const [departureDate, setDepartureDate] = useState(state.departureDate || "");
    const [returnDate, setReturnDate] = useState(state.returnDate || "");
    const [passengers, setPassengers] = useState(state.passengers || 1)

    const innerHandleSubmit = async (event) => {

        event.preventDefault()

        const data = await handleSubmit(event, departurePlanet, arrivalPlanet, departureDate, returnDate, passengers)

        if (data) {
            setState(data)
            if (!data.error) {
                history.push('/display-journey')
            }
        }
    }

    return (
        <div className="">
            <h1 className="text-white my-5 text-center"> Let the Journey Begin </h1>
            <form onSubmit={innerHandleSubmit}
                className="w-100">
                <div className="d-flex flex-column flex-lg-row justify-content-around">
                    <div className="d-flex flex-column mx-auto my-2">
                        <label className="text-white text-lg mx-auto fs-5">
                            From
                        </label>
                        <select 
                        data-testid="inlineFormCustomSelect"
                        value={departurePlanet} 
                        onChange={(e) => {
                            setDeparturePlanet(e.target.value);
                        }}
                            className="rounded-pill mx-auto text-center" style={{ height: '45px', width: '170px', backgroundColor: "#F1E0D4" }} id="inlineFormCustomSelect">
                            <option>Departure</option>
                            <option value="katysirles">Katysirles</option>
                            <option value="mohdreza">Mohdreza</option>
                            <option value="earth">Earth</option>
                            <option value="farnocchia">Farnocchia</option>
                            <option value="geographus">Geographus</option>
                            <option value="jacoblemaire">Jacoblemaire</option>
                        </select>
                    </div>

                    <div className="d-flex flex-column mx-auto my-2">
                        <label className="text-white text-lg fs-5 mx-auto">
                            To
                        </label>
                        <select value={arrivalPlanet} onChange={(e) => {
                            setArrivalPlanet(e.target.value);
                        }}
                            className="rounded-pill text-center mx-auto" style={{ height: "45px", width: "170px", backgroundColor: "#F1E0D4" }} id="inlineFormCustomSelect">
                            <option>Destination</option>
                            <option value="katysirles">Katysirles</option>
                            <option value="mohdreza">Mohdreza</option>
                            <option value="earth">Earth</option>
                            <option value="farnocchia">Farnocchia</option>
                            <option value="geographus">Geographus</option>
                            <option value="jacoblemaire">Jacoblemaire</option>
                        </select>
                    </div>

                    <div className="d-flex flex-column mx-auto my-2">
                        <label htmlFor="depart" className="text-white text-lg fs-5 mx-auto">
                            Depart
                        </label>

                        <input value={departureDate.slice(0,10)} onChange={(e) => {
                            setDepartureDate(e.target.value);
                        }}
                            type="date" style={{ height: '45px', width: '170px', backgroundColor: "#F1E0D4" }} className="rounded-pill p-2 mb-2 mx-auto text-center" id="inlineFormCustomSelect" />
                    </div>

                    <div className="d-flex flex-column mx-auto my-2">
                        <label htmlFor="return" className="text-white text-lg fs-5 mx-auto">
                            Return
                        </label>
                        <input value={returnDate.slice(0,10)} onChange={(e) => {
                            setReturnDate(e.target.value);
                        }} type="date" style={{ height: '45px', width: '170px', backgroundColor: "#F1E0D4" }} className="rounded-pill p-2 mb-2 text-center mx-auto" id="inlineFormCustomSelect" />
                    </div>
                </div>
                <div className="d-flex flex-column my-2">
                    <label htmlFor="passengers" className="text-white text-lg fs-5 mx-auto">
                        Passengers
                    </label>
                    <input value={passengers} onChange={(e) => {
                        setPassengers(e.target.value);
                    }}
                        type="text" style={{ height: '45px', width: '150px', backgroundColor: "#F1E0D4" }} className="w-10 mx-auto rounded-pill text-center" />
                    <div className='mt-3' style={{ height: '15px' }}>
                        {state.error && <p className='text-warning text-center'>{state.error}</p>}
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Link  className="btn btn-orange rounded-pill  me-2 mt-5 mb-3" to="/map-page">Back</Link>
                    <button  className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3">Search</button>
                </div>
            </form>

        </div>
    )
}
