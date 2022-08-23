import React from 'react'
import './PlanetInfo.css'
import { capitalise } from '../../helpers'

export default function PlanetInfo({ selectedPlanet }) {

    const info = {
        jacoblemaire: [
            "The planet of Jacoblemaire is known for its aquatic life, and sunny beaches. A perfect location for those who are looking to relax by the water.", "8.56AU", "74.9k miles"
        ],
        farnocchia: [
            "The planet of Farnocchia is known for its abundance of unique produce. A perfect location for travellers who are looking to discover new eats.", "0.523AU", "4.2k miles"
        ],
        geographus: [
            "The planet of Geographus is known for its colourful mountainous terrains. A perfect location for outdoor activities for adventure seekers.", "4.20AU", "88.8k miles"
        ],
        mohdreza: [
            "The planet of Mohdreza is known for its intricate architecture structures and cityscapes. This is the ideal location for those who was to immerse themselves in a way of living.", "0.277AU", "7.5k miles"
        ],
        katysirles: ["The planet of Katysirles is known for its colourful sunsets & night sky. The perfect location for stargazing and best views of the solar system.", "0.612AU", "3.0k miles"
        ],
        earth: ["Our own wonderful planet.", "0AU", "7.9k miles"
        ]
    }

    if (!selectedPlanet || selectedPlanet === 'none')
        return (
            <div className='PlanetInfo mx-auto d-flex flex-column text-white rounded-5 p-2 text-center'>
                <p className='h3 text-center'>Our Destinations</p>
                <p className='h5 my-auto mx-auto'>Explore the destinations by clicking on the planets.</p>
            </div>
        )
    else return (
<div>
        <div className='PlanetInfo mx-auto background-cream rounded-5'>
            <p className='px-2 text-center mx-auto h5'>{capitalise(selectedPlanet)}</p>
            <p className='text-left px-2'><span><b>Distance from the Earth: </b> {info[selectedPlanet][1]}*;</span> <b> Diameter: </b> {info[selectedPlanet][2]}.</p>
            <p className='text-left px-2'><span><b>Highlight: </b></span><span>{info[selectedPlanet][0]}</span> </p>
        </div>

</div>
    )
}
