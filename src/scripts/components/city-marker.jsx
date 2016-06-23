'use strict';

import React, { PropTypes } from 'react';

import project from '../lib/projection';

class CityMarker extends React.Component {
	render () {
		const { latitude, top, name } = this.props;
		const style = {
			top: top || project(latitude) * 100 + '%',
		}
		return <div className="city-marker" style={style}>
			<span className="city-marker-label">
				<span className="city-marker-label-text">{name}</span>
			</span>
		</div>
	}
}
CityMarker.propTypes = {
	name: PropTypes.string,
	latitude: PropTypes.number,
	top: PropTypes.string,
}

export default CityMarker;
