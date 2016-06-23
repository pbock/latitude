'use strict';

const ADD_CITIES = 'ADD_CITIES';

export function addCities(cities) {
	return { type: ADD_CITIES, cities };
}

export default function visibleCities(state = [], action) {
	switch (action.type) {
		case ADD_CITIES:
			return [ ...state, ...action.cities ];
		default:
			return state;
	}
}
