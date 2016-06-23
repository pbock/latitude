'use strict';

const ADD_VISIBLE_CITY = 'ADD_VISIBLE_CITY';
const REMOVE_VISIBLE_CITY = 'REMOVE_VISIBLE_CITY';

export function addVisibleCity(name) {
	return { type: ADD_VISIBLE_CITY, name };
}
export function removeVisibleCity(name) {
	return { type: REMOVE_VISIBLE_CITY, name };
}

export default function visibleCities(state = [], action) {
	switch (action.type) {
		case ADD_VISIBLE_CITY:
			return [ ...state, action.name ];
		case REMOVE_VISIBLE_CITY:
			return state.filter(name => name !== action.name);
		default:
			return state;
	}
}
