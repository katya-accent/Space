
const {
	extraHandler,
	priceHandler,
	bootstrap,
	getDestinationById,
	getDestinations,
	saveOrderHandler,
	getOrderById
	
} = require("./db");

const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/bootstrap", async (request, response) => {
	console.log("/api/bootstrap: called");
	const result = await bootstrap();
	result === 201
		? response.status(result).json({'bootstrap': 'called ok'})
		: response
				.status(result)
				.json({ error: "Error running bootstrap, see server logs" });
});


//the URL here and in db.js should be the same and should match our preset url names

app.get('/api/destinations', async (request, response) => {
    console.log('/api/destinations: called');
    const resultRecords = await getDestinations();
    response.status(200).json(resultRecords)
});

app.get('/api/destination/:id', async (request, response) => {
    const destinationId = request.params.id
    console.log('/api/destination:id: called with destinationId', destinationId);
    const resultRecords = await getDestinationById(destinationId);
    response.status(200).json(resultRecords)
});

app.get('/api/price', priceHandler)
app.get('/api/extra', extraHandler)


app.get('/api/orders/:id', getOrderById)
app.post('/api/orders', saveOrderHandler)

// Teapot default
app.use("/api/*", (request, response) => {
	console.log("/api/*: called");
	response.status(418).json({ message: "I'm a teapot" });
});

module.exports = app;
