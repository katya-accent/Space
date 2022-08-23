//Component for rendering the 2d map of the solar system
import React, { useState, useEffect } from 'react'
import MapComponent from '../MapComponent/MapComponent'
import PlanetInfo from '../PlanetInfo/PlanetInfo'
import { Link } from 'react-router-dom'
import './MapPage.css'
import { useHistory } from 'react-router-dom'



export default function Map({ setState }) {
  const history = useHistory()

  const [selectedPlanet, setSelectedPlanet] = useState("none")
  useEffect(() => {
  }, [selectedPlanet])

  const handleContinue = (e) => {
    e.preventDefault()
    setState(p => {
      const newState = p
      newState.destinationPlanet = selectedPlanet
      return newState
    })
    history.push('/select-journey')
  }

  return (
    <div className='d-flex flex-column mx-auto'>

      <div>
        <PlanetInfo selectedPlanet={selectedPlanet} />
      </div>
      <div>
        <MapComponent setSelectedPlanet={setSelectedPlanet} />
      </div>
      <div className="MapPage-links d-flex justify-content-end">
        <Link className="btn btn-orange rounded-pill  me-2 mt-5 mb-3" to="/">Back</Link>
        <button onClick={handleContinue} className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3">Continue</button>
      </div>
      {
        (selectedPlanet !== "none") && <p className='text-white text-center my-4'>*<b>AU</b> - astronomical unit, equals the distance between the Sun and the Earth</p>
      }
    </div>
  )
}
