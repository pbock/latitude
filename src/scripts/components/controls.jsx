'use strict';

import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';

import { addVisibleCity } from '../reducers/visible-cities';
import { connect } from 'react-redux';


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
	handleSelect(value) {
		this.setState({ value: '' });
		this.props.onSelectCity(value);
	}
	render() {
		const { cities } = this.props;

		function shouldItemRender(item, value) {
			// if (renderedCount > 20) return;
			const shouldRender = value.length && item.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
			// if (shouldRender) ++renderedCount;
			return shouldRender;
		}

		const autocomplete = <Autocomplete
			items={cities}
			value={this.state.value}
			onChange={(ev, value) => this.setState({ value })}
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
	dispatch => ({ onSelectCity: name => dispatch(addVisibleCity(name)) })
)(Controls);

export default ControlsContainer;
