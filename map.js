const list_of_cities = [
  ['Nashville, TN', 36.17, -86.78],
  ['New York, NY', 40.71, -74.00],
  ['Atlanta, GA', 33.75, -84.39],
  ['Denver, CO', 39.74, -104.98],
  ['Seattle, WA', 47.61, -122.33],
  ['Los Angeles, CA', 34.05, -118.24],
  ['Memphis, TN', 35.15, -90.05],
];

class Map {
  constructor(cities) {
    this.cities = cities.map((item) => {
      const city = Object.create(null);
      let fullname;
      [fullname, city.latitude, city.longitude] = item;
      [city.name, city.state] = fullname.split(', ');
      return city;
    });
  }

  mostFar(cardinalDirection) {
    const name = cardinalDirection.toUpperCase();
    const cases = {
      N: (accum, currentCity) => (accum.latitude > currentCity.latitude ? accum : currentCity),
      S: (accum, currentCity) => (accum.latitude < currentCity.latitude ? accum : currentCity),
      E: (accum, currentCity) => (accum.longitude > currentCity.longitude ? accum : currentCity),
      W: (accum, currentCity) => (accum.longitude < currentCity.longitude ? accum : currentCity),
    };
    return this.cities.reduce(cases[name]).name;
  }

  closestTo(lat, lon) {
    const city = this.cities.reduce(
      (accum, currentCity) => {
        const minDist = Math.hypot(lat - accum.latitude, lon - accum.longitude);
        const dist = Math.hypot(lat - currentCity.latitude, lon - currentCity.longitude);
        return minDist < dist ? accum : currentCity;
      },
    );
    return city.name;
  }

  stateAbbreviations() {
    const uniqueStates = [...new Set(this.cities.map(city => city.state))];
    return uniqueStates.join(' ');
  }
}

const map = new Map(list_of_cities);
console.log('closest:', map.closestTo(10, 10));
console.log('closest:', map.closestTo(-50, -50));
console.log('state abbreviations:', map.stateAbbreviations());
console.log('northernmost:', map.mostFar('N'));
console.log('southernmost:', map.mostFar('S'));
console.log('easternmost:', map.mostFar('E'));
console.log('westernmost:', map.mostFar('W'));
