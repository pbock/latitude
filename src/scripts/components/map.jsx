'use strict';

import React, { PropTypes } from 'react';

import AxisLines from './axis-lines';
import Continent from './continent';
import CityMarker from './city-marker';

class LatitudeMap extends React.Component {
	render () {
		const { continentsWithCities } = this.props;
		const maxRight = continentsWithCities.map(c => c.right)
			.reduce((prev, cur) => Math.max(prev, cur), 0);
		const continents = this.props.continentsWithCities.map(continent => {
			const cities = continent.cities || [];
			const cityMarkers = cities.map(({ name, latitude }) => {
				const top = (latitude - continent.north) / (continent.south - continent.north) * 100 + '%';
				return <CityMarker key={name} name={name} latitude={latitude} top={top} />
			})
			return <Continent
				key={continent.name}
				left={continent.left / maxRight}
				right={continent.right / maxRight}
				north={continent.north}
				south={continent.south}
				name={continent.name}
				align={continent.name === 'South America' ? 'right' : 'left'}
			>
			{cityMarkers}
			</Continent>
		})
		return <div className="map">
			<AxisLines latitudes />
			<div className="map-body map-container">
				{continents}
			</div>
		</div>
	}
}
LatitudeMap.propTypes = {
	continentsWithCities: PropTypes.array.isRequired,
}

export default LatitudeMap;
