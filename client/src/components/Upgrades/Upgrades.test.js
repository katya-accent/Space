import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom'
import Upgrades from './Upgrades'
import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/user-event/dist/utils';
import { createMemoryHistory } from 'history';

let mockState={
}

describe('Upgrades', () => {

  beforeEach(()=>{
    mockState =
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
        spacesuit: {selected:true, shorthand: 'spacesuit'},
        reel: {selected:true, shorthand: 'reel'},
        spacerock: {selected:true, shorthand: 'spacerock'},
      }
    }
  }
  )
  
  
  it('if no state is passed, user is prompted to search again', () => {
    const state = {}
    const mockFetchExtras = jest.fn()
    mockFetchExtras.mockReturnValue(new Promise((res,rej)=>res({})))

    render(<BrowserRouter>
    <Upgrades state={state} fetchExtras={mockFetchExtras}></Upgrades>
    </BrowserRouter>);

      const error = screen.getByText(/Could not retrieve journey details/)
    expect(error).toBeInTheDocument();

  });

  it('when any upgrade is ticked, the price changes', async () => {



    const mockSetState = jest.fn()
    const mockFetchExtras = jest.fn()
    mockFetchExtras.mockReturnValue(
      new Promise((res,rej)=>{
        res(
          [
            {
            extra_id: 1,
            extra_name: "Gold Space Suit",
            extra_price: 50000,
            extra_shorthand: "spacesuit"
            },
            {
            extra_id: 2,
            extra_name: "Highlight Reel compilationm of your trip",
            extra_price: 10000,
            extra_shorthand: "reel"
            },
            {
            extra_id: 3,
            extra_name: "Space rock souvenir",
            extra_price: 5000,
            extra_shorthand: "spacerock"
            }
            ]
        )
      })
      )

    const history = createMemoryHistory()

    render(<Router history={history}>
      <Upgrades state={mockState} fetchExtras={mockFetchExtras} setState={mockSetState}/>
      </Router>);

      await wait(100)

      const totalPriceElement = screen.getByTestId('display-price')
      const totalPrice = totalPriceElement.innerHTML
      const checkbox = screen.getAllByRole('checkbox')      
      userEvent.click(checkbox[0])
      const totalPriceElementAfterClick = screen.getByTestId('display-price')
      const totalPriceAfterClick = totalPriceElementAfterClick.innerHTML
      
      expect(totalPrice).not.toBe(totalPriceAfterClick)

  });
});


  it('when next is pressed, we push next page to the history', async () => {

    const mockPush = jest.fn();
    jest.mock('react-router-dom', () => ({
        useHistory: () => {
            const push = () => mockPush();
            return { push };
        },
    }));

    
    const history = createMemoryHistory()
    global.fetch = jest.fn()
    const mockSetState = jest.fn()
    const mockFetchExtras = jest.fn()
    mockFetchExtras.mockReturnValue(
      new Promise((res,rej)=>{
        res(
          [
            {
            extra_id: 1,
            extra_name: "Gold Space Suit",
            extra_price: 50000,
            extra_shorthand: "spacesuit"
            },
            {
            extra_id: 2,
            extra_name: "Highlight Reel compilationm of your trip",
            extra_price: 10000,
            extra_shorthand: "reel"
            },
            {
            extra_id: 3,
            extra_name: "Space rock souvenir",
            extra_price: 5000,
            extra_shorthand: "spacerock"
            }
            ]
        )
      })
      )

    render(<Router history={history}>
      <Upgrades state={mockState} fetchExtras={mockFetchExtras} setState={mockSetState}/>
      </Router>);

      const button = screen.getByText(/Confirm/);

      userEvent.click(button)


      await wait(500);
      expect(history.location.pathname).toBe('/payment-form');

  })

  it('should keep the upgrades if state is present', async () =>{

    const mockFetchExtras = jest.fn()
    global.fetch = jest.fn()
    const mockSetState = jest.fn()

    mockFetchExtras.mockReturnValue(
      new Promise((res,rej)=>{
        res(
          [
            {
            extra_id: 1,
            extra_name: "Gold Space Suit",
            extra_price: 50000,
            extra_shorthand: "spacesuit"
            },
            {
            extra_id: 2,
            extra_name: "Highlight Reel compilationm of your trip",
            extra_price: 10000,
            extra_shorthand: "reel"
            },
            {
            extra_id: 3,
            extra_name: "Space rock souvenir",
            extra_price: 5000,
            extra_shorthand: "spacerock"
            }
            ]
        )
      })
      )

    render(<BrowserRouter>
      <Upgrades state={mockState} setState={mockSetState} fetchExtras={mockFetchExtras}/>
      </BrowserRouter>);
      await wait(500);
      
      const checkBox = screen.getByTestId('reelCheckbox')
      await wait(100);
      const checked = checkBox.checked
      expect(checked).toBe(true);
  })




// when next is pressed, we push next page to the history


