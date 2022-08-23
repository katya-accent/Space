const { dateDiffInYears, calculatePrice } = require('./price.js')

describe('Date difference', () => {
    it('should return the difference between the selected date and the current date (in years)', () => {
        //Arrange
        const selectedDate = new Date("2032-07-05");
        const currentDate = new Date("2022-07-05");
        //Act
        const res = dateDiffInYears(selectedDate, currentDate);
        //Assert
        expect(res).toEqual(10);
    })
})

describe('Price calculator',() =>{
    it('should return a price dependent on the distance and the date difference',() =>{
        //Arrange
        const selectedDate = new Date("2032-07-05");
        const currentDate = new Date("2022-07-05");
        const distance = 1;
        //Act
        const price = calculatePrice(distance, currentDate, selectedDate);
        //Assert
        expect(price).toEqual(316227);
    })
})
