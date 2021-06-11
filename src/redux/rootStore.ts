import {configureStore} from '@reduxjs/toolkit';
import {isServer} from '../utils/isServerEnvChecker';
import merge from 'deepmerge';

export const createReduxStore = (initialState = {}, _additionalState = {}) => {
	const state: {} = merge(initialState, _additionalState);
	const preloadedState = isServer ? state : window.__INITIAL_STATE__;

	if (!isServer) {
		// @ts-ignore
		delete window.__INITIAL_STATE__;
	}


	const store = configureStore({
		reducer: {},
		preloadedState,
		devTools: !isServer
	});

	return {store};
};
