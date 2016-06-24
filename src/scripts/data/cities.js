'use strict';
const continents = [
	'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America', 'Antarctica',
]

function get() {
	return fetch('data/cities.json')
		.then(r => r.json())
		.then(cities => cities.map(city => ({
			id: city[0],
			sizeRank: city[0],
			name: city[1],
			latitude: city[2],
			continent: continents[city[3]],
		}) ))
}

export default { get };
