
const { saveOrderHandler } = require("./db")


beforeEach(() => {
    jest.resetAllMocks()
});

describe('SaveOrderHandler', () => {

    it('should send response code 400 if not all parameters have been provided', () => {

        const mockJson = jest.fn()
        const expecterErrorObject = {
                error: 'please provide all neccessary details',
                neededFields: 'PhoneNumber, id, totalPrice, extrasTotalPrice, departurePlanet, destinationPlanet, departureDate, returnDate, fullName, address, email, cardDetails, upgrades'
        }
        const request = {
            body:{
                id:"31283-sasfo-123-wq",
                phoneNumber:'34280423',
            }
        }
        const response = {
            status:jest.fn(), 
        }
        response.status.mockReturnValue(
            {
                json:mockJson
            }
        )   

        saveOrderHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(400)

    })



})
