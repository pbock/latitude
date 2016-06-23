'use strict';
const continents = [
	'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America', 'Antarctica',
]

function get() {
	return fetch('data/cities.json')
		.then(r => r.json())
		.then(cities => cities.map(city => ({
			name: city[0],
			latitude: city[1],
			continent: continents[city[2]],
		}) ))
}

export default { get };
