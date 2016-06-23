'use strict';

import React, { PropTypes } from 'react';
import project from '../lib/projection';

class AxisLine extends React.Component {
	render() {
		const { latitude, style } = this.props;
		let label;

		if (latitude > 0) label = latitude + '° N';
		else if (latitude < 0) label = -latitude + '° S';
		else label = 'Equator';

		const top = project(latitude) * 100 + '%';

		return <div className={`axis-line mod-${style}`} style={{top}}>
			<span className="axis-line-label">{label}</span>
		</div>
	}
}
AxisLine.propTypes = {
	latitude: PropTypes.number.isRequired,
	style: PropTypes.oneOf([ 'major', 'minor', 'equator' ]),
}

class AxisLines extends React.Component {
	render() {
		const axisLines = [];
		for (let latitude = -90; latitude <= 90; latitude += 10) {
			let style;
			if (latitude === 0) style = 'equator';
			else if (latitude % 20) style = 'minor';
			else style = 'major';
			axisLines.push(<AxisLine latitude={latitude} style={style} key={latitude} />)
		}
		return <div className="axis-lines map-container">
			{axisLines}
		</div>
	}
}

export default AxisLines;
