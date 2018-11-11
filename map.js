let list_of_cities = [
    ["Nashville, TN", 36.17, -86.78],
    ["New York, NY", 40.71, -74.00],
    ["Atlanta, GA", 33.75, -84.39],
    ["Denver, CO", 39.74, -104.98],
    ["Seattle, WA", 47.61, -122.33],
    ["Los Angeles, CA", 34.05, -118.24],
    ["Memphis, TN", 35.15, -90.05],
];

class Map {
    constructor(cities) {
        this.cities = cities.map(item => {
            let city = Object.create(null);
            let splittedName = item[0].split(", ");
            city.name = splittedName[0];
            city.state = splittedName[1];
            city.latitude = item[1];
            city.longitude = item[2];
            return city;
        });
    }

    mostFar(cardinalDirection) {
        cardinalDirection = cardinalDirection.toUpperCase();
        let cases = {
            'N': () => this.cities.reduce((accum, currentCity) => accum.latitude > currentCity.latitude ? accum : currentCity),
            'S': () => this.cities.reduce((accum, currentCity) => accum.latitude < currentCity.latitude ? accum : currentCity),
            'E': () => this.cities.reduce((accum, currentCity) => accum.longitude > currentCity.longitude ? accum : currentCity),
            'W': () => this.cities.reduce((accum, currentCity) => accum.longitude < currentCity.longitude ? accum : currentCity)
        }
        return cases[cardinalDirection]().name;
    }

    closestTo(lat, lon) {
        let city = this.cities.reduce(
            (accum, currentCity) => {
                let minDist = Math.hypot(lat - accum.latitude, lon - accum.longitude);
                let dist = Math.hypot(lat - currentCity.latitude, lon - currentCity.longitude);
                return minDist < dist ? accum : currentCity;
            });
        return city.name;
    }

    stateAbbreviations() {
        let unique = [...new Set(this.cities.map(city => city.state))];
        return unique.join(' ');

    }

}


let map = new Map(list_of_cities);
console.log(map.closestTo(10, 10));
console.log(map.closestTo(-50, -50));
console.log(map.stateAbbreviations());
console.log(map.mostFar('N'));
console.log(map.mostFar('S'));
console.log(map.mostFar('E'));
console.log(map.mostFar('W'));