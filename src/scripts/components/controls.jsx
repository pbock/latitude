'use strict';

import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';

import { addVisibleCity, clearVisibleCities } from '../reducers/visible-cities';
import { connect } from 'react-redux';

// Ugly, hacky workaround for 'React.findDOMNode is not a function' TypeError
React.findDOMNode = React.findDOMNode || (el => el); // eslint-disable-line

function AutocompleteRow(city, isHighlighted) {
	const className = 'autocomplete-row' + (isHighlighted ? ' is-highlighted' : '');
	return <div className={className} key={city.name + city.latitude}>
		<p>{city.name} <span className="autocomplete-row-secondary">{city.continent}</span></p>
	</div>
}

class LabeledField extends React.Component {
	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = { hasFocus: false };
	}
	handleFocus() {
		this.setState({ hasFocus: true });
	}
	handleBlur() {
		this.setState({ hasFocus: false });
	}
	render() {
		const className = 'labeled-field ' + (this.state.hasFocus ? 'has-focus' : '');
		return <label className={className} onFocus={this.handleFocus} onBlur={this.handleBlur}>
			<span className="labeled-field-label">{this.props.label}</span>
			<span className="labeled-field-field">{this.props.children}</span>
		</label>
	}
}
LabeledField.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
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
		const { value } = this.state;

		const autocomplete = <Autocomplete
			items={value.length ? cities.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) === 0).slice(0, 20) : []}
			value={this.state.value}
			onChange={(ev, value) => this.setState({ value: value })}
			onSelect={this.handleSelect}
			getItemValue={city => city.name}
			renderItem={AutocompleteRow}
			inputProps={{ placeholder: 'e.g. Berlin', className: 'search-field', type: 'search' }}
		/>

		let clearAll;
		if(this.props.clearAllIsVisible) {
			clearAll = <button className="controls-button" onClick={this.props.onClearVisibleCities}>Clear All</button>
		}

		return <div className="controls">
			<LabeledField label="Add a City">{autocomplete}</LabeledField>
			{' '}
			{clearAll}
		</div>
	}
}
Controls.propTypes = {
	onSelectCity: PropTypes.func,
	onClearVisibleCities: PropTypes.func,
	cities: PropTypes.array.isRequired,
	clearAllIsVisible: PropTypes.bool,
}
Controls.defaultProps = {
	onSelectCity: () => {},
	onClearVisibleCities: () => {},
	clearAllIsVisible: true,
}

const ControlsContainer = connect(
	state => ({ cities: state.cities, clearAllIsVisible: !!state.visibleCities.length }),
	dispatch => ({
		onSelectCity: city => dispatch(addVisibleCity(city.id)),
		onClearVisibleCities: () => dispatch(clearVisibleCities()),
	})
)(Controls);

export default ControlsContainer;
