
import React from 'react'
import { numberWithCommas, capitalise } from '../../helpers'
import photo from '../../images/photo.png'
import spacerock from '../../images/spacerock.png'
import spacesuit from '../../images/spacesuit.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Upgrades({ state, setState, fetchExtras }) {


  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState(state.totalPrice)
 // const [trueExtras, setTrueExtras] = useState([]);
  const [extras, setExtras] = useState([])
  const [extrasTotalPrice, setExtrasTotalPrice] = useState(0);

  const [formState, setFormState] = useState(state.upgrades || {
    spacesuit: { name: 'Gold Space Suit', selected: false, shorthand: 'spacesuit' },
    reel: { name: 'Highlight Reel of your trip', selected: false, shorthand: 'reel' },
    spacerock: { name: 'Space rock souvenir', selected: false, shorthand: 'spacerock' },
  })

  // state.upgrades.spacesuit || {selected:false, shorthand: 'spacesuit'}



  useEffect(() => {
    fetchExtras().then(data => {
      setExtras(data)
    })
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    setTotalPrice(state.totalPrice + calculateExtrasPrice())
    // eslint-disable-next-line
  }, [extras])

  const calculateExtrasPrice = () => {

    if (extras.length === 0) {
      return 0
    }

    let extrasTotal = 0

    const trueExtras = [];

    // eslint-disable-next-line 
    for (const [key, value] of Object.entries(formState)) {
      if (value.selected === true) trueExtras.push(value.shorthand)
    }

    trueExtras.forEach(shorthand => {
      const correctExtra = extras.find(extra => extra.extra_shorthand === shorthand)
      extrasTotal += correctExtra.extra_price * state.passengers;
    })
    setExtrasTotalPrice(extrasTotal);
    return extrasTotal

  }

  useEffect(() => {
    setTotalPrice(state.totalPrice + calculateExtrasPrice())
    // eslint-disable-next-line
  }, [formState])



  // handle submit export to handlers and decide how to 
  function handleNextButton(e) {
    e.preventDefault()
    setState(previousState => {
      const newState = { ...previousState }
      newState.upgrades = formState;
    //  newState.trueExtras = trueExtras
      newState.extrasTotal = extrasTotalPrice
      return newState
    })
    history.push('/payment-form')
  }

  function handleBackButton(e) {
    e.preventDefault()
    setState(previousState => {
      const newState = { ...previousState }
      newState.upgrades = formState;
      return newState
    })
    history.push('/display-journey')
  }

  const handleCheckbox = (event) => {
    const upgrade = event.target.name
    const newFormState = { ...formState }
    newFormState[upgrade].selected = !formState[upgrade].selected
    setFormState(newFormState)
  }


  if (Object.keys(state).length === 0) {
    return (
      <div className='text-center p-2 rounded-3 d-flex flex-column mx-auto my-auto text-white background-cream'>
        <p className='text-orange p-2'>Could not retrieve journey details - please search again</p>
        <Link className="btn btn-dark mx-auto mb-2" to="/select-journey">Search</Link>
      </div>)
  } else

    return (
      <div className='w-100  text-white'>
        <h2 className='text-center m-3'>Add Upgrades</h2>
        <div className=" mx-auto d-flex flex-column flex-lg-row gap-5 justify-content-center">
          <div className='mx-auto w-sm-50 d-flex flex-column'>
            <img className='img-fluid' src={spacesuit} alt="" />
            <p className='text-center h3'>{extras[0] && extras[0].extra_name}</p>
            <p className='text-center text-orange h3'>Price:</p>
            <p className='text-center text-orange h3'>£{extras[0] && numberWithCommas(extras[0].extra_price)}</p>
            <input value={formState.spacesuit} checked={formState.spacesuit.selected} onChange={handleCheckbox} style={{ transform: 'scale(2)' }} name="spacesuit" type="checkbox" data-testid="spacesuitCheckbox" />
          </div>
          <div className='  mx-auto d-flex flex-column'>
            <img className='img-fluid' src={photo} alt="" />
            <p className='text-center h3'>{extras[1] && extras[1].extra_name}</p>
            <p className='text-center text-orange h3'>Price:</p>
            <p className='text-center text-orange h3'>£{extras[1] && numberWithCommas(extras[1].extra_price)}</p>
            <input value={formState.reel} checked={formState.reel.selected} onChange={handleCheckbox} style={{ transform: 'scale(2)' }} type="checkbox" name="reel" data-testid="reelCheckbox" />
          </div>
          <div className=' mx-auto d-flex flex-column lg-me-5'>
            <img className='img-fluid' src={spacerock} alt="" />
            <p className='text-center h3'>{extras[2] && extras[2].extra_name}</p>
            <p className='text-center text-orange h3'>Price:</p>
            <p className='text-center text-orange h3'>£{extras[2] && numberWithCommas(extras[2].extra_price)}</p>
            <input value={formState.spacerock} checked={formState.spacerock.selected} onChange={handleCheckbox} style={{ transform: 'scale(2)' }} type="checkbox" name="spacerock" id="" />
          </div>
          <div className=' mx-auto mb-5 lg-my-0 lg-mx-5 d-flex flex-column' style={{ maxWidth: '250px' }}>
            <div className="journey-summary-box text-black text-center fs-5 border py-2 rounded-5 justify-content-center d-flex flex-column" style={{ backgroundColor: "#F1E0D4" }}>
              <p className='text-orange h3 m-2'>Your Journey Summary</p>
              <p className='h6 my-2 mx-4'><span className='text-orange'>Dates: </span><span>{state.departureDate.slice(0, 10).replaceAll('-', '/')}</span><span className='text-orange'> to </span>{state.returnDate.slice(0, 10).replaceAll('-', '/')}<span></span></p>
              <p className='h6 my-2 mx-4'><span className='text-orange'>Destination: </span><span>{capitalise(state.destinationPlanet)}</span></p>
              <p className='h6 my-2 mx-4'><span className='text-orange'>Distance: </span><span>{state.distance.toFixed(3)} AU</span></p>
              <p className='h6 my-2 mx-4'><span className='text-orange'>Passengers: </span><span>{state.passengers}</span></p>
              <p className='h6 my-2 mx-4'><span className='text-orange'>What is included: </span><span>3 Meals a day, mini-fridge,internet connection, en-suite bathroom & laundry service</span></p>
            </div>
            <p className='text-center h3 mt-4'>Total Price:</p>
            <p data-testid='display-price' className='text-center h3 mt-0s'>£{numberWithCommas(totalPrice)}</p>
            <div className="d-flex justify-content-end">
              <button onClick={handleBackButton}  className="btn btn-orange rounded-pill  me-2 mt-5 mb-3" to="/display-journey">Back</button>
              <button onClick={handleNextButton} className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3" to="/">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
}
