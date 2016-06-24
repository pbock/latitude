'use strict';

import React, { PropTypes } from 'react';

class CityMarkerCluster extends React.Component {
	render() {
		const { children } = this.props;
		const largest = children.map(c => c.props).reduce((previous, current) => previous && previous.sizeRank < current.sizeRank ? previous : current)
		const averageTop = children.reduce((total, current) => total + current.props.top, 0) / children.length;
		const labelStyle = {
			top: averageTop * 100 + '%',
		}
		return <div className="city-marker-cluster">
			{children}
			<span className="city-marker-cluster-label" style={labelStyle}>
				<span className="city-marker-cluster-label-text">
					{`${largest.name} +${children.length - 1}`}
				</span>
			</span>
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
			if (Array.isArray(el)) {
				const key = el.map(e => e.props.id).join('+');
				return <CityMarkerCluster key={key}>{el}</CityMarkerCluster>;
			}
			return el;
		})

		return <div>{clustered}</div>;
	}
}
CityMarkerClusterer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	threshold: PropTypes.number.isRequired,
}

export default CityMarkerClusterer;
