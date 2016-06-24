'use strict';

import React from 'react';
import { connect } from 'react-redux';

import LatitudeMap from './map';
import Controls from './controls';

function mapStateToProps(state) {
	const { cities } = state;
	const visibleCities = state.visibleCities.map( name => cities.find(city => city.name === name) );

	const continentsWithCities = state.continents.map(continent => {
		const cities = visibleCities.filter(city => city.continent === continent.name);
		return Object.assign({}, continent, { cities });
	})

	return { continentsWithCities };
}
const LatitudeMapContainer = connect(mapStateToProps)(LatitudeMap);

class App extends React.Component {
	render() {
		return <div>
			<Controls />
			<LatitudeMapContainer />
		</div>;
	}
}

export default App;
