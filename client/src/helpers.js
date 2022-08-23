function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
function capitalise (word){
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  

  module.exports  = {
    numberWithCommas,
    capitalise
  }
