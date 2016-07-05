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
		{ name: 'North America', labelAlign: 'right', north: 83.5, south: 12.3, left: 0, right: 1 },
		{ name: 'South America', north: 12.3, south: -55.7, left: 0, right: 1 },

		{ name: 'Europe', labelAlign: 'right', north: 71.13, south: 35.0, left: 1, right: 2 },
		{ name: 'Africa', north: 35.0, south: -34.8, left: 1, right: 2 },

		{ name: 'Asia', labelAlign: 'right', north: 77.7, south: 4.1, left: 2, right: 3 },
		{ name: 'Oceania', north: 4.1, south: -47.2, left: 2, right: 3 },
	],
	visibleCities: [ 19, 139, 3610, 916, 82, 85, 24, 80, 3, 61, 636, 46, 4, 18, 654, 0, 2, 54, 49, 1, 39	],
}, window.devToolsExtension && window.devToolsExtension());
Cities.get().then(c => store.dispatch(addCities(c)));

document.addEventListener('DOMContentLoaded', () => {
	require('../styles/latitude.scss');
	render(<Provider store={store}><App /></Provider>, document.querySelector('main'));
})
