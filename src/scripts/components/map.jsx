'use strict';

import React, { PropTypes } from 'react';

import AxisLines from './axis-lines';
import Continent from './continent';
import CityMarker from './city-marker';
import CityMarkerClusterer from './city-marker-clusterer';

class LatitudeMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = { height: null };
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		this.updateDimensions();
	}

	updateDimensions() {
		requestAnimationFrame(() => {
			const { height } = this._map.getBoundingClientRect();
			this.setState({ height });
		})
	}

	render () {
		const { continentsWithCities } = this.props;
		const maxRight = continentsWithCities.map(c => c.right)
			.reduce((prev, cur) => Math.max(prev, cur), 0);
		const continents = this.props.continentsWithCities.map(continent => {
			const cities = continent.cities || [];
			const cityMarkers = cities.map(({ name, latitude }) => {
				const top = (latitude - continent.north) / (continent.south - continent.north);
				return <CityMarker key={name} name={name} latitude={latitude} top={top} />
			})
			return <Continent
				key={continent.name}
				left={continent.left / maxRight}
				right={continent.right / maxRight}
				north={continent.north}
				south={continent.south}
				name={continent.name}
				align={continent.labelAlign}
			>
				<CityMarkerClusterer threshold={0.2}>{cityMarkers}</CityMarkerClusterer>
			</Continent>
		})
		return <div className="map" ref={el => this._map = el}>
			<AxisLines latitudes />
			<div className="map-body map-container">
				<p>{ this.state.height }</p>
				{continents}
			</div>
		</div>
	}
}
LatitudeMap.propTypes = {
	continentsWithCities: PropTypes.array.isRequired,
}

export default LatitudeMap;
