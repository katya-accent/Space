import React from 'react'
import logoSvg from '../../images/1.svg'
import { NavLink } from "react-router-dom";



export default function AboutUs() {


    return (
        <div className="my-auto" id="aboutUsComponent">

            <div className="d-flex flex-column" style={{ minHeight: "600px" }}>

                <NavLink style={{ width: "100px" }} to="/"><img src={logoSvg} alt="logo" width="250" /></NavLink>

                <div className="my-auto ms-auto mx-auto w-50 text-center">
                    <p className="h3 text-white mt-4"><b>Mission statement</b></p>
                    <p className="text-white h4">
                        To create a more interconnected way of living through space travel
                    </p>
                    <p className="h3 text-white mt-4"><b>Values</b></p>
                    <p className="text-white h4">
                        Curiosity, Excellence & Integrity
                    </p>
                    <p className="h3 text-white mt-4"><b>Who we are</b></p>
                    <p className="text-white h4">
                        Infinispace was founded in 2022 by a group of five individuals who were tired of traditional methods of travelling, and were looking for new adventures.
                    </p>
                    <p className="h3 text-white mt-4"><b>What we do</b></p>
                    <p className="text-white h4">
                        Provide an out of world experience through offering a range of options to discover life outside of our planet
                    </p>
                </div>
            </div>
        </div>
    )
}

/* 
Mission statement: To create a more interconnected way of living through space travel
Values: Curiosity, Excellence & Integrity
Who we are: Infinispace was founded in 2022 by a group of five individuals who were tired of traditional methods of travelling, and were looking for new adventures.
What we do: Provide an out of world experience through offering a range of options to discover life outside of our planet
*/
