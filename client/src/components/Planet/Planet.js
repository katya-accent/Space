import earth from '../../images/planet1.png'
import katysirles from '../../images/planet2.png'
import mohdreza from '../../images/planet3.png'
import farnocchia from '../../images/planet4.png'
import geographus from '../../images/planet5.png'
import jacoblemaire from '../../images/planet6.png'

export default function Planet({planetName}) {

  const planet = planetName.toLowerCase()

  const planetImages = {
    earth,
    katysirles,
    mohdreza,
    farnocchia,
    geographus,
    jacoblemaire
  }

  const planetNames = ['katysirles', 'mohdreza', 'earth', 'farnocchia', 'geographus', 'jacoblemaire']
  
  const validPlanet = planetNames.includes(planet)
  
  if (!validPlanet) {
    return <div><h4 className='text-white'>Invalid Planet</h4></div>
  }

  else {
    return <div className=''>
      <img className='img-fluid' src={planetImages[planetName]} alt={`${planetName}`} />
    </div>

  }

}
