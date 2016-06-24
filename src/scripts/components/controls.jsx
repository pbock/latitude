'use strict';

import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';

import { addVisibleCity } from '../reducers/visible-cities';
import { connect } from 'react-redux';

// Ugly, hacky workaround for 'React.findDOMNode is not a function' TypeError
React.findDOMNode = React.findDOMNode || (el => el); // eslint-disable-line

function AutocompleteRow(city, isHighlighted) {
	const className = 'autocomplete-row' + (isHighlighted ? ' is-highlighted' : '');
	return <div className={className} key={city.name + city.latitude}>
		<p>{city.name} <span className="autocomplete-row-secondary">{city.continent}</span></p>
	</div>
}

class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect(value, item) {
		this.setState({ value: '' });
		this.props.onSelectCity(item);
	}
	render() {
		const { cities } = this.props;

		function shouldItemRender(item, value) {
			const shouldRender = value.length && item.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
			return shouldRender;
		}

		const autocomplete = <Autocomplete
			items={cities}
			value={this.state.value}
			onChange={(ev, value) => this.setState({ value: value })}
			onSelect={this.handleSelect}
			getItemValue={city => city.name}
			renderItem={AutocompleteRow}
			shouldItemRender={shouldItemRender}
		/>

		return <div className="controls">{autocomplete}</div>
	}
}
Controls.propTypes = {
	onSelectCity: PropTypes.func,
	cities: PropTypes.array.isRequired,
}
Controls.defaultProps = {
	onSelectCity: () => {},
}

const ControlsContainer = connect(
	state => ({ cities: state.cities }),
	dispatch => ({ onSelectCity: city => dispatch(addVisibleCity(city.id)) })
)(Controls);

export default ControlsContainer;
