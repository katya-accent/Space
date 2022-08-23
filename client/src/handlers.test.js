import { handleSelectionFormSubmit, handlePaymentFormSubmit, fetchOrderByID } from './handlers.js'

describe('Test handlers', () => {

    const fakeEvent = { preventDefault: () => { } }
    const departurePlanet = 'Earth';
    const destinationPlanet = 'Mars';
    const departureDate = '12/05/2030';
    const returnDate = '12/05/2060';
    const passengers = '1';
    const fullName = "fullName";
    const email = "email";
    const cardDetails = "";
    const address = "address";
    const phoneNumber = "062362161";
    const id = "id-test-123";
    const totalPrice = "123523463426";
    const extrasTotal = "1243151";
    const upgrades = {
        spacesuit: { selected: true, shorthand: 'spacesuit' },
        reel: { selected: true, shorthand: 'reel' },
        spacerock: { selected: true, shorthand: 'spacerock' },
    }
    const url = 'http://localhost:8080/orders'

    it('should send an api request', () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
            })
        );

        handleSelectionFormSubmit(fakeEvent, departurePlanet, destinationPlanet, departureDate, returnDate, passengers)

        expect(fetch).toHaveBeenLastCalledWith(`http://localhost:8080/price?departurePlanet=${departurePlanet}&destinationPlanet=${destinationPlanet}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`)

    })

    it('should return data on a 200 response', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ response: 200 }),
            })
        );

        const data = await handleSelectionFormSubmit(fakeEvent, departurePlanet, destinationPlanet, departureDate, returnDate, passengers)
        expect(data).toEqual({ response: 200 })
    })

    it('should send a POST request', () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
            })
        );

        handlePaymentFormSubmit(phoneNumber, id, totalPrice, extrasTotal, departurePlanet, destinationPlanet, departureDate, returnDate, fullName, address, email, cardDetails, upgrades, passengers)

        expect(fetch).toHaveBeenLastCalledWith(url, {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                id: id,
                journeyPrice: totalPrice,
                extrasPrice: extrasTotal,
                departurePlanet: departurePlanet,
                arrivalPlanet: destinationPlanet,
                departureDate: departureDate,
                returnDate: returnDate,
                fullName: fullName,
                address: address,
                emailAddress: email,
                cardDetails: cardDetails,
                upgrades: upgrades,
                passengers: passengers
            })
        })

    })

    //Get order by id
    it('should send a fetch request containing the query id', async() => {
        global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(),
        })
    );

    const id = "1234-5678-9012"

    fetchOrderByID(id)


    expect(fetch).toHaveBeenLastCalledWith(`${url}/${id}`, {
        headers: { "Content-type": "application/json" },
        method: "GET"
    })
    })
})
