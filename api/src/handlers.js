const { calculatePrice } = require('./functions/price')
const { makePool } = require('./connections')


const testHandler = async (request, response) => {

    // todo - pull the data from database instead of hard coding the response
    const result = await makePool().query("SELECT * FROM hello")

    response.status(200).json(result.rows)
}

const priceHandler = async (request, response) => {

    if (request.query.destinationPlanet === undefined || request.query.departurePlanet === undefined || request.query.departureDate === undefined || request.query.returnDate === undefined || request.query.passengers === undefined ) {
        response.status(400).json({error:'Please provide departurePlanet, destinationPlanet, departureData and returnDate'})
        return
    }

    const currentDate = new Date()
    const possibleDestinations = ['katysirles', 'mohdreza', 'earth', 'farnocchia', 'geographus', 'jacoblemaire']

    const departurePlanet = request.query.departurePlanet.toLowerCase()
    const destinationPlanet = request.query.destinationPlanet.toLowerCase()
    const departureDate = new Date(request.query.departureDate)
    const returnDate = new Date(request.query.returnDate)
    const passengers = parseInt(request.query.passengers)

    if(!possibleDestinations.includes(departurePlanet)) {
        response.status(400).json({error:'Invalid departure planet'})
        return
    }

    if(!possibleDestinations.includes(destinationPlanet)) {
        response.status(400).json({error:'Invalid destination planet'})
        return
    }

    if (!passengers){
        response.status(400).json({error:'Please provide the number of passengers'})
        return
    }

    if (departureDate < currentDate) {
        console.log(departureDate < currentDate);
        response.status(400).json({error:'Departure date must be in the future.'})
        return
    }

    if (returnDate < departureDate) {
        console.log(departureDate < currentDate);
        response.status(400).json({error:'Return date must be after departure date'})
        return
    }

    if (departureDate == 'Invalid Date'){
        response.status(400).json({error:'Invalid departure date format'})
        return
    }

    if (returnDate == 'Invalid Date'){
        response.status(400).json({error:'Invalid return date format'})
        return
    }

    let result = null
    
    try {
        result = await makePool().query("SELECT * FROM planet WHERE planet = $1" ,[destinationPlanet])
    } catch {
        console.log()
        response.status(500).json({error:"Database is not connected."})
    }
    
    const planetData = result.rows[0]
    const distance = parseFloat(planetData[departurePlanet])

    if (distance === 0) {
        response.status(400).json({error:"Destination and Departure planets must be different"})
        return
    }

    const priceThere = calculatePrice(distance,currentDate,departureDate)
    const priceBack = calculatePrice(distance,currentDate,returnDate)
    const totalPrice = (priceThere + priceBack) * passengers

    response.status(200).json({
        distance, 
        departurePlanet,
        destinationPlanet,
        departureDate,
        returnDate,
        passengers,
        priceThere,
        priceBack,
        totalPrice,
    })
}

const extraHandler = async (request, response) => {
    let result = null
    
    try {
        result = await makePool().query("SELECT * FROM extra")
    } catch {
        console.log()
        response.status(500).json({error:"Database is not connected."})
    }
    response.status(200).json(result.rows)
}

module.exports = {
    testHandler,
    priceHandler,
    extraHandler
}
