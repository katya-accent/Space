const handlers = require('./handlers')
const { makePool } = require('./connections')

jest.mock('./connections')

let fakePoolFn
let fakeQueryFn

beforeEach(() => {
    jest.resetAllMocks()
    fakePoolFn = jest.fn()
    fakeQueryFn = jest.fn()
});

const mockDatabaseResponse = {
    rows: [
        1,
        2,
        3
    ]
}

describe('testHandler', () => {
    it('should call query with expected SQL', async () => {
    
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)

        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { dummy: 'request' }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.testHandler(fakeReq, fakeRes)
    
        expect(fakeQueryFn).toHaveBeenCalledTimes(1)
        expect(fakeQueryFn).toHaveBeenLastCalledWith("SELECT * FROM hello")
    })

    it('should call response with the correct status code', async () => {

        const fakePoolFn = jest.fn()
        const fakeQueryFn = jest.fn()
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)
    
        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { dummy: 'request' }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.testHandler(fakeReq, fakeRes)
    
        expect(fakeStatusFn).toHaveBeenCalledTimes(1)
        expect(fakeStatusFn).toHaveBeenLastCalledWith(200)
    })
    
    it('should call json with expected data', async () => {
    
        const fakePoolFn = jest.fn()
        const fakeQueryFn = jest.fn()
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)

        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { dummy: 'request' }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.testHandler(fakeReq, fakeRes)
    
        expect(fakeJsonFn).toHaveBeenCalledTimes(1)
        expect(fakeJsonFn).toHaveBeenLastCalledWith( [
            1,
            2,
            3
        ])
    })
})


describe('priceHandler',()=>{
    it('should query database for the right planet', async () => {
    
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)

        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { query:{
            destinationPlanet: 'mohdreza',
            departurePlanet: 'earth',
            departureDate: '12/31/2522',
            returnDate: '12/31/2550',
            passengers: 1,
        } }

        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.priceHandler(fakeReq, fakeRes)
    
        expect(fakeQueryFn).toHaveBeenCalledTimes(1)
        expect(fakeQueryFn).toHaveBeenLastCalledWith("SELECT * FROM planet WHERE planet = $1", ['mohdreza'])
    })

    it('should call response with status 400 if provided with wrong dastination', async () => {

        const fakePoolFn = jest.fn()
        const fakeQueryFn = jest.fn()
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)
    
        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { query:{
            destinationPlanet: 'wrongplanet',
            departurePlanet: 'earth',
            departureDate: '15/12/2522'
        } }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.priceHandler(fakeReq, fakeRes)
    
        expect(fakeStatusFn).toHaveBeenCalledTimes(1)
        expect(fakeStatusFn).toHaveBeenLastCalledWith(400)
    })


    it('should call response with status 400 if provided with wrong date (invalid format or in the past)', async () => {

        const fakePoolFn = jest.fn()
        const fakeQueryFn = jest.fn()
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)
    
        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { query:{
            destinationPlanet: 'mars',
            departurePlanet: 'earth',
            departureDate: '15/12/1992'
        } }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.priceHandler(fakeReq, fakeRes)
    
        expect(fakeStatusFn).toHaveBeenCalledTimes(1)
        expect(fakeStatusFn).toHaveBeenLastCalledWith(400)
    })


})

describe('extraHandler', () => {
    it('should call query with expected SQL', async () => {
    
        fakePoolFn.query = fakeQueryFn
        makePool.mockReturnValue(fakePoolFn)

        fakeQueryFn.mockResolvedValue(mockDatabaseResponse)
    
        // fake request obj.
        const fakeReq = { dummy: 'request' }
        // fake response obj.
        const fakeRes = { dummy: 'response' }
    
        const fakeStatusFn = jest.fn()
        const fakeJsonFn = jest.fn()
        fakeRes.status = fakeStatusFn
        fakeStatusFn.mockReturnValue({ json: fakeJsonFn })
    
        await handlers.extraHandler(fakeReq, fakeRes)
    
        expect(fakeQueryFn).toHaveBeenCalledTimes(1)
        expect(fakeQueryFn).toHaveBeenLastCalledWith("SELECT * FROM extra")
    })
})
