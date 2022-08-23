import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom'
import PaymentForm from './PaymentForm'
import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/user-event/dist/utils';
import { createMemoryHistory } from 'history';


it('if no state is passed, user is prompted to search again', () => {
    const state = {}
    const mockFetchExtras = jest.fn()
    mockFetchExtras.mockReturnValue(new Promise((res, rej) => res({})))

    render(<BrowserRouter>
        <PaymentForm state={state} fetchExtras={mockFetchExtras}></PaymentForm>
    </BrowserRouter>);

    const error = screen.getByText(/Could not retrieve journey details/)
    expect(error).toBeInTheDocument();

});

it('when next is pressed, we push next page to the history', async () => {

    const mockPush = jest.fn();
    jest.mock('react-router-dom', () => ({
        useHistory: () => {
            const push = () => mockPush();
            return { push };
        },
    }));

    const mockPaymentHandleSubmit = jest.fn();

    const history = createMemoryHistory()
    global.fetch = jest.fn()
    const mockSetState = jest.fn()
    let mockState =
    {
        departureDate: "2022-07-24T00:00:00.000Z",
        departurePlanet: "katysirles",
        destinationPlanet: "earth",
        distance: 0.6129679144385026,
        passengers: 1,
        priceBack: 612967,
        priceThere: 612967,
        returnDate: "2022-07-31T00:00:00.000Z",
        totalPrice: 1225934,
        upgrades: {
            spacesuit: { selected: true, shorthand: 'spacesuit' },
            reel: { selected: true, shorthand: 'reel' },
            spacerock: { selected: true, shorthand: 'spacerock' },
        }
    }
    render(<Router history={history}>
        <PaymentForm state={mockState} handlePaymentSubmit={mockPaymentHandleSubmit} setState={mockSetState} />
    </Router>);

    

    const button = screen.getByText(/Next/);

    userEvent.click(button)


    await wait(500);
    expect(history.location.pathname).toBe('/booking-confirmation');

})
