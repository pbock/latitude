'use strict';

import React from 'react';

import LatitudeMap from './map';

const continents = [
	{ name: 'North America', north: 83.5, south: 12.3, left: 0, right: 1 },
	{ name: 'South America', labelAlign: 'right', north: 12.3, south: -55.7, left: 0, right: 1 },

	{ name: 'Europe', north: 71.13, south: 34.6, left: 1, right: 2, cities: [
		{ name: 'Berlin', latitude: 50 },
		{ name: 'Some city with a dreadfully long name', latitude: 45 },
	] },
	{ name: 'Africa', labelAlign: 'right', north: 37.3, south: -34.8, left: 1, right: 2 },

	{ name: 'Asia', north: 77.7, south: 8.7, left: 2, right: 3 },
	{ name: 'Oceania', labelAlign: 'right', north: -0.4, south: -47.2, left: 2, right: 3 },
]

class App extends React.Component {
	render() {
		return <LatitudeMap continentsWithCities={continents}></LatitudeMap>
	}
}

export default App;
