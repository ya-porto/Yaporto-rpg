import {configureStore, EnhancedStore} from '@reduxjs/toolkit';

import characterReducer from './characterSlice';
import gameReducer from './gameSlice';
import userReducer from './userSlice';

export function createStore(reducers: reducers, preloadedState = {}): EnhancedStore {
	return configureStore({
		reducer: reducers,
		preloadedState
	});
}

// Линтер не понимает что тут объявляется интерфейс
/* eslint-disbale-next-line */
interface reducers {
	user: typeof userReducer,
	game: typeof gameReducer,
	character: typeof characterReducer
}

// eslint-disable-next-line no-redeclare
export const reducers = {
	user: userReducer,
	game: gameReducer,
	character: characterReducer
};
export {characterReducer, gameReducer, userReducer};
