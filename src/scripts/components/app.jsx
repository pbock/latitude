'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import LatitudeMap from './map';
import latitudeApp from '../reducers';

import { addCities } from '../reducers/cities';

import Cities from '../data/cities';

const store = createStore(latitudeApp, {}, window.devToolsExtension && window.devToolsExtension());
Cities.get().then(c => store.dispatch(addCities(c)));

const continents = [
	{ name: 'North America', north: 83.5, south: 12.3, left: 0, right: 1 },
	{ name: 'South America', labelAlign: 'right', north: 12.3, south: -55.7, left: 0, right: 1 },

	{ name: 'Europe', north: 71.13, south: 34.6, left: 1, right: 2 },
	{ name: 'Africa', labelAlign: 'right', north: 37.3, south: -34.8, left: 1, right: 2 },

	{ name: 'Asia', north: 77.7, south: 8.7, left: 2, right: 3 },
	{ name: 'Oceania', labelAlign: 'right', north: -0.4, south: -47.2, left: 2, right: 3 },
]

function mapStateToProps(state) {
	const { cities } = state;
	const visibleCities = state.visibleCities.map( name => cities.find(city => city.name === name) );

	const continentsWithCities = continents.map(continent => {
		const cities = visibleCities.filter(city => city.continent === continent.name);
		return Object.assign({}, continent, { cities });
	})

	console.log(continentsWithCities);
	return { continentsWithCities };
}
const LatitudeMapContainer = connect(mapStateToProps)(LatitudeMap);

class App extends React.Component {
	render() {
		return <Provider store={store}>
			<LatitudeMapContainer></LatitudeMapContainer>
		</Provider>;
	}
}

export default App;
