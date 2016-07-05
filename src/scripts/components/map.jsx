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
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
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
			const cityMarkers = cities.map(({ id, name, latitude, sizeRank }) => {
				const top = (latitude - continent.north) / (continent.south - continent.north);
				return <CityMarker key={id} id={id} sizeRank={sizeRank} name={name} latitude={latitude} top={top} />
			})
			const clusterThreshold = (continent.north - continent.south) / 180 / this.state.height * 300;
			return <Continent
				key={continent.name}
				left={continent.left / maxRight}
				right={continent.right / maxRight}
				north={continent.north}
				south={continent.south}
				name={continent.name}
				align={continent.labelAlign}
			>
				<CityMarkerClusterer threshold={clusterThreshold}>{cityMarkers}</CityMarkerClusterer>
			</Continent>
		})
		return <div className="map" ref={el => this._map = el}>
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
