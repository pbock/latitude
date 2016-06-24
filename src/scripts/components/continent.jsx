'use strict';

import React, { PropTypes } from 'react';

import CityMarkerClusterer from './city-marker-clusterer';

import project from '../lib/projection';

class Continent extends React.Component {
	render() {
		const { north, south, left, right, name, align } = this.props;
		const style = {
			top: project(north) * 100 + '%',
			height: (project(south) - project(north)) * 100 + '%',
			left: `calc(${left * 100}% + 1.5em)`,
			width: `calc(${(right - left) * 100}% - 2em)`,
		}
		return <div className="continent" style={style}>
			<h1 className={`continent-name mod-${align}`}>{name}</h1>
			<div className="continent-cities">
				{this.props.children}
			</div>
		</div>
	}
}
Continent.propTypes = {
	north: PropTypes.number.isRequired,
	south: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	right: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	children: PropTypes.node,
	align: PropTypes.oneOf([ 'left', 'right' ]),
}
Continent.defaultProps = {
	align: 'left',
}

export default Continent;
