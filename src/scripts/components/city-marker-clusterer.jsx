'use strict';

import React, { PropTypes } from 'react';
import project from '../lib/projection';

class CityMarkerClusterDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		}
	}

	render() {
		const { children } = this.props;
		const { isExpanded } = this.state;
		const isExpandedClass = isExpanded ? 'is-expanded' : 'is-contracted';

		const largest = children.map(c => c.props).reduce((previous, current) => previous && previous.sizeRank < current.sizeRank ? previous : current)
		const lis = children.map((c, i) => <li key={c.props.name} className={'dropdown-item ' + isExpandedClass} style={{ transitionDelay: i * 0.05 + 's' }}>{c}</li>);

		return <div
			className="dropdown"
			onMouseEnter={() => this.setState({ isExpanded: true })}
			onMouseLeave={() => this.setState({ isExpanded: false })}
		>
			<span className="dropdown-label">{largest.name + ' +' + (children.length - 1)}</span>
			<ul className={'dropdown-expander ' + isExpandedClass}>{lis}</ul>
		</div>
	}
}

class CityMarkerCluster extends React.Component {
	render() {
		const { children } = this.props;
		const averageTop = children.reduce((total, current) => total + current.props.top, 0) / children.length;
		const labelStyle = {
			top: averageTop * 100 + '%',
		}

		// The "ghost lines" that are going to be displayed in the background
		const lines = children.map((c) => {
			const { latitude, top, id } = c.props;
			return <div className="city-marker" key={id} style={{
				top: top * 100 + '%' || project(latitude) * 100 + '%',
			}}></div>;
		});

		return <div className="city-marker-cluster">
			{lines}
			<div className="city-marker-cluster-label" style={labelStyle}>
				<CityMarkerClusterDropdown>{children}</CityMarkerClusterDropdown>
			</div>
		</div>
	}
}

class CityMarkerClusterer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children, threshold } = this.props;
		children.sort((a, b) => a.props.top - b.props.top);
		let clustered = [];
		let previousEl;
		for (let i = 0; i < children.length; i++) {
			const el = children[i];
			if (previousEl) {
				const distance = el.props.top - previousEl.props.top;
				if (distance < threshold) {
					let lastElement = clustered.pop();
					if (Array.isArray(lastElement)) lastElement.push(el);
					else lastElement = [ lastElement, el ];
					clustered.push(lastElement);
				} else {
					clustered.push(el);
				}
			} else {
				clustered.push(el);
			}
			previousEl = el;
		}

		clustered = clustered.map(el => {
			// If it's a clustered group, wrap it in a Cluster element
			if (Array.isArray(el)) {
				const key = el.map(e => e.props.id).join('+');
				return <CityMarkerCluster key={key}>{el}</CityMarkerCluster>;
			}

			const { latitude, top, id } = el.props;

			// Else wrap it in a div for positioning
			return <div className="city-marker" key={id} style={{
				top: top * 100 + '%' || project(latitude) * 100 + '%',
			}}>{el}</div>;
		})

		return <div>{clustered}</div>;
	}
}
CityMarkerClusterer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	threshold: PropTypes.number.isRequired,
}

export default CityMarkerClusterer;
