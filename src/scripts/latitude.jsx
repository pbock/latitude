'use strict';

import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

require('../styles/latitude.scss');

document.addEventListener('DOMContentLoaded', () => {
	render(<App />, document.querySelector('main'));
})
