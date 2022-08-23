import JourneySelectionForm from './JourneySelectionForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/user-event/dist/utils';

// When we handle submit we make an api call. We verify that the correct parameters are in the url.

const mockState={
    departureDate: "2022-07-24T00:00:00.000Z",
    departurePlanet: "katysirles",
    destinationPlanet: "earth",
    distance: 0.6129679144385026,
    passengers: 1,
    priceBack: 612967,
    priceThere: 612967,
    returnDate: "2022-07-31T00:00:00.000Z",
    totalPrice: 1225934,
  }

describe('JourneySelectionForm', () => {
    it('Should display search button.', async () => {

        render(<BrowserRouter>
            <JourneySelectionForm setState={{}} state={{}} />
        </BrowserRouter>);

        const button = screen.getByText(/Search/);
        expect(button).toBeInTheDocument();
    })

    describe('handleSubmit', () => {
        it('When we click the submit button we make an api call.', () => {

            const mockSetState = jest.fn()
            const mockHandleSubmit = jest.fn()

            global.fetch = jest.fn()

            render(<BrowserRouter>
                <JourneySelectionForm setState={mockSetState} state={{ departurePlanet: 'Earth' }} handleSubmit={mockHandleSubmit} />
            </BrowserRouter>);

            const button = screen.getByText(/Search/);
            expect(button).toBeInTheDocument();
            userEvent.click(button)
            expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
        })

        it('If the response does not contain an error, we push a new entry to the history', async() => {

            const mockPush = jest.fn();
            jest.mock('react-router-dom', () => ({
                useHistory: () => {
                    const push = () => mockPush();
                    return { push };
                },
            }));

            const mockSetState = jest.fn()
            const mockHandleSubmit = jest.fn()
            mockHandleSubmit.mockReturnValue({ response: 200 })

            const history = createMemoryHistory()

            render(<Router history={history}>
                <JourneySelectionForm setState={mockSetState} state={{ mockState }} handleSubmit={mockHandleSubmit} />
            </Router>);

            const button = screen.getByText(/Search/);
            userEvent.click(button)

            await wait(500)
            expect(history.location.pathname).toBe('/display-journey');
        })
    })

    it('when navigating to the page, the fields should be populated with data from the mock if it exists', () =>{
        
        render(<BrowserRouter>
            <JourneySelectionForm setState={{}} state={mockState} />
        </BrowserRouter>);

        const select = screen.getByTestId('inlineFormCustomSelect')
        expect(select.value).toBe('katysirles')
    })
})

