const client = require("data-api-client");

const { calculatePrice } = require("./price.js")

const {
    createSql00_dropAll,
    createSql01_DestinationsTable,
    createSql02_DestinationsData,
    createSql03_ExtraTable,
    createSql04_ExtraData,
    createSql05_OrderTable
} = require("./db-schema-sql");

const connection = client({
    secretArn: process.env.SECRET_ARN || 'NOT_SET',
    resourceArn: process.env.CLUSTER_ARN || 'NOT_SET',
    database: process.env.DB_NAME || 'NOT_SET',
});

const bootstrap = async () => {
    console.log("bootstrap: called");
    try {
        await connection.query(createSql00_dropAll);
        await connection.query(createSql01_DestinationsTable);
        await connection.query(createSql02_DestinationsData);
        await connection.query(createSql03_ExtraTable);
        await connection.query(createSql04_ExtraData);
        await connection.query(createSql05_OrderTable);
        console.log("bootstrap: done");
        return 201;
    } catch (error) {
        console.log("bootstrap: error:", error);
        return 500;
    }
};

// EXAMPLES OF CALL FUNCTIONS (need to be adapted to our case):


//react app (form) ----> API -----> Database

const getOrderById = async (request,response) => {
    const id = request.params.id
    console.log("getOrderById: called with", request.params.id);
    try {
        const result = await connection.query(
            "SELECT * FROM order_detail WHERE id = :id",
            {
                id: id,
            }
        );
        console.log("getOrderById: result.records=", result.records);
        response.status(200).json(result.records)
    } catch (error) {
        console.log(error);
        response.status(500).json({error:error.message})
    }

};

const saveOrderHandler = async (request,response) => {
    console.log('saveOrder called');
    console.log('body passed to the endpoint :', JSON.stringify(request.body))

    const parameters = { 
        phoneNumber: request.body.phoneNumber,
        id: request.body.id,
        totalPrice: request.body.journeyPrice,
        extrasPrice: request.body.extrasPrice,
        departurePlanet: request.body.departurePlanet,
        destinationPlanet: request.body.arrivalPlanet,
        departureDate: request.body.departureDate,
        returnDate: request.body.returnDate,
        fullName: request.body.fullName,
        address: request.body.address,
        email: request.body.emailAddress,
        paymentDetails: request.body.cardDetails,
        upgrades: request.body.upgrades,
        passengers: request.body.passengers
    }

    const allValues = Object.values(parameters)
    const isThereUndefinedValuesInParameters = allValues.includes(undefined)
    if(isThereUndefinedValuesInParameters) {
        console.log('INVALID PARAMETERS')
        response.status(400).json({
            error: 'please provide all necessary details',
            neededFields: 'PhoneNumber, id, paymentDetails, journeyPrice, extrasPrice, departurePlanet, arrivalPlanet, departureDate, returnDate, fullName, address, emailAddress, passengers '
        }
        )
        return
    }


    // create query //to insert into table
    try {
        const result = await connection.query(
            `INSERT INTO order_detail(id, payment_details, journey_price, extras_price, departure_planet, arrival_planet , departure_date, return_date , full_name, address, phone_number, email_address, passengers, upgrades) 
                VALUES(:id, :paymentDetails, :totalPrice, :extrasPrice, :departurePlanet, :arrivalPlanet, :departureDate, :returnDate, :fullName, :address, :phoneNumber, :emailAddress, :passengers, :upgrades );`
                ,{
                    id: parameters.id,
                    paymentDetails: parameters.paymentDetails,
                    totalPrice: parameters.totalPrice,
                    extrasPrice: parameters.extrasPrice,
                    departurePlanet: parameters.departurePlanet,
                    arrivalPlanet: parameters.destinationPlanet,
                    departureDate: parameters.departureDate,
                    returnDate: parameters.returnDate,
                    fullName: parameters.fullName,
                    address: parameters.address,
                    phoneNumber: parameters.phoneNumber,
                    emailAddress: parameters.email,
                    passengers: parameters.passengers,
                    upgrades: request.body.upgrades.join(',') || ''
                }

        )

        console.log('getDestinations: result.records=', result.records)
        response.status(201).json({message: `successfully saved order id: ${parameters.id}`})
        return
        
    } catch (err) {
        console.log(err)
        response.status(500).json({error: err.message})
        return
    }


}


const getDestinations = async () => {
    console.log('getDestinations called')
    const result = await connection.query(
        'SELECT * FROM planet ORDER BY planet_id;'
    )
    console.log('getDestinations: result.records=', result.records)
    return result.records
}

const getDestinationById = async (idParameter) => {
    console.log("getDestinationById: called with", idParameter);
    const result = await connection.query(
        "SELECT * FROM planet WHERE planet_id = :id",
        {
            id: parseInt(idParameter),
        }
    );
    console.log("getDestinationById: result.records=", result.records);
    return result.records;
};

const priceHandler = async (request, response) => {

    console.log("parameters - " + request.query.destinationPlanet, request.query.departureDate, request.query.departureDate, request.query.returnDate, request.query.passengers)

    if (request.query.destinationPlanet === undefined || request.query.departurePlanet === undefined || request.query.departureDate === undefined || request.query.returnDate === undefined || request.query.passengers === undefined) {
        response.status(400).json({ error: 'Please provide departurePlanet, destinationPlanet, departureData and returnDate' })
        return
    }

    const currentDate = new Date()
    const possibleDestinations = ['katysirles', 'mohdreza', 'earth', 'farnocchia', 'geographus', 'jacoblemaire']

    const departurePlanet = request.query.departurePlanet.toLowerCase()
    const destinationPlanet = request.query.destinationPlanet.toLowerCase()
    const departureDate = new Date(request.query.departureDate)
    const returnDate = new Date(request.query.returnDate)
    const passengers = parseInt(request.query.passengers)

    if (!possibleDestinations.includes(departurePlanet)) {
        response.status(400).json({ error: 'Invalid departure planet' })
        return
    }

    if (!possibleDestinations.includes(destinationPlanet)) {
        response.status(400).json({ error: 'Invalid destination planet' })
        return
    }

    if (!passengers) {
        response.status(400).json({ error: 'Please provide the number of passengers' })
        return
    }

    if (departureDate < currentDate) {
        console.log(departureDate < currentDate);
        response.status(400).json({ error: 'Departure date must be in the future.' })
        return
    }

    if (returnDate < departureDate) {
        console.log(departureDate < currentDate);
        response.status(400).json({ error: 'Return date must be after departure date' })
        return
    }

    if (departureDate == 'Invalid Date') {
        response.status(400).json({ error: 'Invalid departure date format' })
        return
    }

    if (returnDate == 'Invalid Date') {
        response.status(400).json({ error: 'Invalid return date format' })
        return
    }

    let result = null

    try {
        result = await connection.query("SELECT * FROM planet WHERE planet = :destinationPlanet", {
            destinationPlanet
        })
    } catch {
        response.status(500).json({ error: "Database is not connected." })
    }

    const planetData = result.records[0]
    const distance = parseFloat(planetData[departurePlanet])

    if (distance === 0) {
        response.status(400).json({ error: "Destination and Departure planets must be different" })
        return
    }

    const priceThere = calculatePrice(distance, currentDate, departureDate)
    const priceBack = calculatePrice(distance, currentDate, returnDate)
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
        result = await connection.query("SELECT * FROM extra")
    } catch {
        response.status(500).json({ error: "Database is not connected." })
    }
    response.status(200).json(result.records)
}

module.exports = {
    getDestinationById,
    getDestinations,
    bootstrap,
    extraHandler,
    priceHandler,
    saveOrderHandler,
    getOrderById
}
