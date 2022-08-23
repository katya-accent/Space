import {
      BrowserRouter as Router,
      Switch,
      Route,
    } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import JourneySelectionPage from './components/JourneySelectionPage/JourneySelectionPage.js'
import {useState} from 'react'
import DisplaySummary from "./components/DisplaySummary/DisplaySummary.js";
import Upgrades from "./components/Upgrades/Upgrades.js";
import Map from "./components/MapPage/MapPage.js"
import './App.css'
import { fetchExtras } from './handlers'
import PaymentForm from "./components/PaymentForm/PaymentForm.js";
import { handlePaymentFormSubmit } from './handlers.js'
import Confirmation from './components/ConfirmationPage/ConfirmationPage.js'
import Booking from './components/Booking/Booking.js'
import AboutUs from "./components/AboutUs/AboutUs.js";
import Faq from "./components/Faq/Faq.js";
import ContactUs from "./components/ContactUs/ContactUs.js";

function App() {
  const [state, setState] = useState({})
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container d-flex mt-5" style={{ height: "65vh" }}>
        <Switch>
          <Route path="/select-journey">
            <JourneySelectionPage setState={setState} state={state}/>
          </Route>
          <Route path="/display-journey">
            <DisplaySummary state={state} />
          </Route>
          <Route path="/add-upgrades">
            <Upgrades state={state} setState={setState} fetchExtras={fetchExtras} />
          </Route>

          <Route path="/map-page">
            <Map setState={setState} />
          </Route>

          <Route path="/payment-form">
            <PaymentForm state={state} setState={setState} handlePaymentSubmit={handlePaymentFormSubmit}/>
          </Route>

          <Route path="/booking-confirmation">
            <Confirmation state={state} setState={setState}/>
          </Route>
          
          <Route path="/about-us">
            <AboutUs />
          </Route>

          <Route path="/booking-lookup">
            <Booking />
          </Route>

          <Route path="/faq">
            <Faq/>
          </Route>
          
          <Route exact path="/">
            <Home/>
          </Route>
         
          <Route path="/contact-us">
            <ContactUs />
          </Route>

  
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;




