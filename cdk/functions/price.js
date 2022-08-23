function dateDiffInYears(selectedDate, currentDate) {
    const date1 = selectedDate.getFullYear();
    const date2 = currentDate.getFullYear();
    const res = Math.floor(date1 - date2);
    if (res<0) {
        throw 'Error: Previous date selected';
    }

    return res
}
 
function calculatePrice(distance, currentDate, selectedDate){
    const tariff = 1000000;
    let yearsDifference = dateDiffInYears(selectedDate, currentDate);
    if (yearsDifference === 0) {yearsDifference = 1}
    const price = distance * tariff * ((yearsDifference) ** (-0.5));
    return Math.floor(price);
}

module.exports = {
    dateDiffInYears,
    calculatePrice
} 
 