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
		this.props.onDeleteButtonClick(this.props.id);
	}

	render () {
		const { name } = this.props;
		return <span className="city-marker-label">
			<span className="city-marker-label-text">{name}</span>
			<button className="city-marker-label-text city-marker-remove-button" onClick={this.handleDeleteButtonClick}>×</button>
		</span>
	}
}
CityMarker.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	latitude: PropTypes.number,
	top: PropTypes.number,
	onDeleteButtonClick: PropTypes.func,
	showLabel: PropTypes.bool,
}
CityMarker.defaultProps = {
	onDeleteButtonClick: () => {},
	showLabel: true,
}

const CityMarkerContainer = connect(
	(state, ownProps) => ownProps,
	dispatch => ({ onDeleteButtonClick: name => dispatch(removeVisibleCity(name)) })
)(CityMarker);

export default CityMarkerContainer;
