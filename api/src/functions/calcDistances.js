class Planet {
    name
    radius
    period
    distances = []
    constructor (name, radius, period) {
        this.name = name;
        this.radius = radius;
        this.period = period;
    }
}

const mercury = new Planet("Mercury", 57.9*10**6, 88, []);
const venus = new Planet("Venus", 108.2*10**6, 243, []);
const earth = new Planet("Earth", 149.6*10**6, 365.26, []);
const mars = new Planet("Mars", 227.9*10**6, 687, []);
const jupiter = new Planet("Jupiter", 778.4*10**6, 11.86*365.26, []);
const saturn = new Planet("Saturn",1.43*10**9, 29.46*365.26, []);

const planetList = [mercury, venus, earth, mars, jupiter, saturn]

const au = 149600000 //Distance from Sun to Earth - unit for measurement


for (let x=0; x<planetList.length; x++) {
        planetList[x].distances = []
        for (let y=0; y<planetList.length; y++) {
            let d = Math.abs((planetList[x].radius - planetList[y].radius)/au)
            planetList[x].distances.push(d)
        }
    }


const data = JSON.stringify(planetList)

console.log(planetList)

const fs = require("fs");

fs.writeFile("JSON/data.json", data, "utf8", (data) => {
    console.log("Write complete");
    console.log(data);
  });
