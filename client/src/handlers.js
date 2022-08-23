const apiAddress = process.env.REACT_APP_API_ADDRESS || "http://localhost:8080";

export async function handleSelectionFormSubmit(event, departurePlanet, arrivalPlanet, departureDate, returnDate, passengers) {
    // fix localhost to be actual url

    const fullUrl = `${apiAddress}/price?departurePlanet=${departurePlanet}&destinationPlanet=${arrivalPlanet}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`
    //https://infinispace.infinityworks.academy/api/price?departurePlanet=mohdreza&destinationPlanet=geographus&departureDate=2022-07-22&returnDate=2022-08-03&passengers=1
    console.log('handleSelectionFormSubmit fetching from ', fullUrl)

    let res;

    try {
        res = await fetch(fullUrl)
    }
    catch {
        console.log('Unable to handle request');
    }

    console.log("handleSelectionFormSubmit response", res);

    let data;
    try {
        data = await res.json()
    }
    catch {
        console.log("unable to read data from the response")
    }

    if (res.status === 200 || res.status === 400) {
        return data
    }

    if (res.status === 500) {
        console.log("There is an error with the server - 500")
    }

    return undefined
}


export async function fetchExtras() {

    let res;
    try {
        res = await fetch(`${apiAddress}/extra`)
    } catch {
        console.log('Unable to handle request');
    }

    let data;
    try {
        data = await res.json()
    }
    catch {
        console.log('No data was able to be read from response')
    }

    if (res.status === 200) {
        return data
    }

    if (res.status === 400) {
        console.log('invalid request was made')
    }

    if (res.status === 500) {
        console.log('The server has given an error')
    }

    return undefined
}




export async function handlePaymentFormSubmit(phoneNumber, id, totalPrice, extrasTotal, departurePlanet, destinationPlanet, departureDate, returnDate, fullName, address, email, cardDetails, upgrades, passengers) {
    // fix localhost to be actual url
    const url = `${apiAddress}/orders`
    let res
    try {
        res = await fetch(url, {
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
        });

    }
    catch {
        console.log('The connection was not established')
    }
    let data
    try {
        data = await res.json()
    }
    catch {
        console.log('There was no JSON inside the response to be used')
    }
    if (res.status === 200) {
        return data
    }

    if (res.status === 400) {
        console.log('invalid request was made')
    }

    if (res.status === 500) {
        console.log('The server has given an error')
    }
}
//  const result = await fetch(urlPath, {
//  headers: { "Content-Type": "application/json" },
//  method: "POST",
//  body: JSON.stringify(payload),
// });

export async function fetchOrderByID (id) {
    // fix localhost to be actual url
    const url = `${apiAddress}/orders/${id}`
    let res
    try {
        res = await fetch(url, {
            headers: { "Content-type": "application/json" },
            method: "GET"
        });
    }
    catch {
        console.log('The connection was not established')
    }
    let data
    try {
        data = await res.json()
    }
    catch {
        console.log('There was no JSON inside the response to be used')
    }
    if (res.status === 200) {
        return data
    }

    if (res.status === 400) {
        console.log('invalid request was made')
    }

    if (res.status === 500) {
        console.log('The server has given an error')
    }
}
