import React from 'react'
//import logoSvg from '../../images/1.svg'
// import { Link } from 'react-router-dom'
import infiniair from './infiniair.png';
import infiniSub from './InfiniSub.png';
import infinirocket from './Infinirocket.png';
import { useHistory } from "react-router-dom";
import './Confirmation.css'
// eslint-disable-next-line
export default function Confirmation({ state, setState }) {
    // eslint-disable-next-line
    const history = useHistory();
    function handleNextButton(e) {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div className='container my-auto h-600 pt-5'>
            <div className="d-flex justify-content-center mx-auto w-sm-50 d-flex flex-column text-center">
                <div className="text-light h1">YOUR TRIP IS CONFIRMED</div>
                <p className="text-light h3">Your booking ID is: </p>
                <p className="text-light my-4 h3">{state.id}</p>
                <p className="text-light h3">We will be in touch with you soon!</p>
                <p className="text-light h3">In the meantime, why don't you check our partners websites out!</p>
            </div>

            <div className="mx-auto d-flex flex-column flex-lg-row gap-5 justify-content-center">
                <div className='mx-auto d-flex flex-column m-5'>
                    <a href="https://infiniair.infinityworks.academy/" target="_blank" rel="noopener noreferrer">
                        <img className='img-fluid logo ' src={infiniair} alt="" />
                    </a>
                </div>
                <div className='mx-auto d-flex flex-column m-5'>
                    <a href="https://infinirocket.infinityworks.academy/" target="_blank" rel="noopener noreferrer">
                        <img className='img-fluid infiniRocket-logo ' src={infinirocket} alt="" />
                    </a>
                </div>
                <div className='mx-auto d-flex flex-column m-5'>
                    <a href="https://infinisub.infinityworks.academy/" target="_blank" rel="noopener noreferrer">
                        <img className='img-fluid logo ' src={infiniSub} alt="" />
                    </a>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={handleNextButton} className="btn btn-orange rounded-pill ms-auto me-2 mt-5 mb-3" to="/">Homepage</button>
            </div>
        </div>
    )
}
