import React, { useState } from 'react'
import './MapComponent.css'
import Planet from '../Planet/Planet'

export default function MapComponent({ setSelectedPlanet }) {
    const [hoveredPlaned, setHoveredPlanet] = useState('none')

    const handlePlanetChange = (e) => {
        const planet = e.currentTarget.id
        setHoveredPlanet(planet)
        setSelectedPlanet(planet)
    }

    return (
        <div className="MapComponent">
            <div onMouseLeave={() => setHoveredPlanet('none')} id="none" className='MapComponent-container d-flex mx-auto my-auto'>
                <div className="MapComponent-galaxy mx-auto my-auto">

                    {/* JACOBLEMAIRE */}
                    <div className='MapComponent-jacoblemaire border'>
                        <div onClick={handlePlanetChange} id="jacoblemaire" className={`MapComponent-jacoblemaire-wrapper ${hoveredPlaned === 'jacoblemaire' && 'zoom'} ${(hoveredPlaned === 'jacoblemaire' || hoveredPlaned === 'none') ? ' glow' : 'dim'}`}>
                            <Planet planetName="jacoblemaire" />
                        </div>
                    </div>

                    {/* GEOGRAPHOS */}
                    <div className='MapComponent-geographos border'>
                        <div onClick={handlePlanetChange} id="geographus" className={`MapComponent-geographos-wrapper ${hoveredPlaned === 'geographus' && ' zoom '} ${(hoveredPlaned === 'geographus' || hoveredPlaned === 'none') ? ' glow ' : ' dim '}`}>
                            <Planet planetName="geographus" />
                        </div>
                    </div>

                    {/* FARNOCCHIA */}
                    <div className='MapComponent-farnocchia border'>
                        <div onClick={handlePlanetChange} id="farnocchia" className={`MapComponent-farnocchia-wrapper ${hoveredPlaned === 'farnocchia' ? 'zoom' : ''} ${(hoveredPlaned === 'farnocchia' || hoveredPlaned === 'none') ? ' glow' : ' dim'}`}>
                            <Planet planetName="farnocchia" />
                        </div>
                    </div>

                    {/* EARTH */}
                    <div className='MapComponent-earth border'>
                        <div onClick={handlePlanetChange} id="earth" className={`MapComponent-earth-wrapper ${hoveredPlaned === 'earth' && ' zoom '} ${(hoveredPlaned === 'earth' || hoveredPlaned === 'none') ? 'glow' : ' dim'}`}>
                            <Planet planetName="earth" />
                        </div>
                    </div>

                    {/* MOHDREZA */}
                    <div className='MapComponent-mohdreza border'>
                        <div onClick={handlePlanetChange} id="mohdreza" className={`MapComponent-mohdreza-wrapper ${hoveredPlaned === 'mohdreza' && 'zoom'} ${(hoveredPlaned === 'mohdreza' || hoveredPlaned === 'none') ? ' glow' : ' dim'}`}>
                            <Planet planetName="mohdreza" />
                        </div>
                    </div>

                    {/* KATYSIRLES */}
                    <div className='MapComponent-katysirles border'>
                        <div onClick={handlePlanetChange} id="katysirles" className={`MapComponent-katysirles-wrapper ${hoveredPlaned === 'katysirles' && 'zoom'} ${(hoveredPlaned === 'katysirles' || hoveredPlaned === 'none') ? ' glow' : 'dim'}`}>
                            <Planet planetName="katysirles" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
