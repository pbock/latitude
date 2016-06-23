'use strict';

import visibleCities from './visible-cities';
import cities from './cities';

export default function latitudeApp(state = {}, action) {
	return {
		cities: cities(state.cities, action),
		visibleCities: visibleCities(state.visibleCities, action),
	}
}
