'use strict';

const ADD_VISIBLE_CITY = 'ADD_VISIBLE_CITY';
const REMOVE_VISIBLE_CITY = 'REMOVE_VISIBLE_CITY';

export function addVisibleCity(id) {
	return { type: ADD_VISIBLE_CITY, id };
}
export function removeVisibleCity(id) {
	return { type: REMOVE_VISIBLE_CITY, id };
}

export default function visibleCities(state = [], action) {
	switch (action.type) {
		case ADD_VISIBLE_CITY:
			if (state.indexOf(action.id) !== -1) return state;
			return [ ...state, action.id ];
		case REMOVE_VISIBLE_CITY:
			return state.filter(id => id !== action.id);
		default:
			return state;
	}
}
