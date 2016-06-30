'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';

// Reducers
import latitudeApp from './reducers';
import { addCities } from './reducers/cities';
import { addVisibleCity } from './reducers/visible-cities';

import Cities from './data/cities';

const store = createStore(latitudeApp, {
	continents: [
		{ name: 'North America', north: 83.5, south: 12.3, left: 0, right: 1 },
		{ name: 'South America', labelAlign: 'right', north: 12.3, south: -55.7, left: 0, right: 1 },

		{ name: 'Europe', north: 71.13, south: 34.6, left: 1, right: 2 },
		{ name: 'Africa', labelAlign: 'right', north: 37.3, south: -34.8, left: 1, right: 2 },

		{ name: 'Asia', north: 77.7, south: 8.7, left: 2, right: 3 },
		{ name: 'Oceania', labelAlign: 'right', north: -0.4, south: -47.2, left: 2, right: 3 },
	],
	visibleCities: [
		82, // Berlin
		19, // NYC
		170, // Hamburg
		139, // Paris
		3610, // Reykjavík
	],
}, window.devToolsExtension && window.devToolsExtension());
Cities.get().then(c => store.dispatch(addCities(c)));

document.addEventListener('DOMContentLoaded', () => {
	require('../styles/latitude.scss');
	render(<Provider store={store}><App /></Provider>, document.querySelector('main'));
})
