'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import project from '../lib/projection';

import { removeVisibleCity } from '../reducers/visible-cities';

class CityMarker extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
	}

	handleDeleteButtonClick() {
		this.props.onDeleteButtonClick(this.props.name);
	}

	render () {
		const { latitude, top, name } = this.props;
		const style = {
			top: top || project(latitude) * 100 + '%',
		}
		return <div className="city-marker" style={style}>
			<span className="city-marker-label">
				<span className="city-marker-label-text">{name}</span>
				<button className="city-marker-label-text city-marker-remove-button" onClick={this.handleDeleteButtonClick}>×</button>
			</span>
		</div>
	}
}
CityMarker.propTypes = {
	name: PropTypes.string,
	latitude: PropTypes.number,
	top: PropTypes.string,
	onDeleteButtonClick: PropTypes.func,
}
CityMarker.defaultProps = {
	onDeleteButtonClick: () => {},
}

const CityMarkerContainer = connect(
	(state, ownProps) => ownProps,
	dispatch => ({ onDeleteButtonClick: name => dispatch(removeVisibleCity(name)) })
)(CityMarker);

export default CityMarkerContainer;
