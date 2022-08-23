
const cors = require('cors')
const { testHandler, priceHandler, extraHandler } = require('./handlers')
const PORT = 8080

const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())
app.get('/price', priceHandler)
app.get('/extra', extraHandler)


 
app.listen(PORT, () => {
    console.log('Server is running on', PORT);
})
