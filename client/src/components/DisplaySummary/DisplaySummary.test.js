import DisplaySummary from './DisplaySummary';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('DisplaySummary Component', () => {
    it('should display Price when correct state prop is passed', async () => {

        const sampleState = {
            distance: 8.558823529411764,
            departurePlanet: "earth",
            destinationPlanet: "jacoblemaire",
            departureDate: "2022-12-07T00:00:00.000Z",
            returnDate: "2022-12-12T00:00:00.000Z",
            passengers: 2,
            priceThere: 8558823,
            priceBack: 8558823,
            totalPrice: 34235292,
                }


        render(<BrowserRouter><DisplaySummary state={sampleState} /></BrowserRouter>);

        const priceText = screen.getByText('Price:')
        expect(priceText).toBeInTheDocument();
    })

    it('should display invalid planet when wrong planetName prop is passed.', async () => {

        render(<BrowserRouter><DisplaySummary state={{}} /></BrowserRouter>);

        const invalidPlanetDiv = screen.getByText(/could not retrieve/i);
        expect(invalidPlanetDiv).toBeInTheDocument();
    })
})
