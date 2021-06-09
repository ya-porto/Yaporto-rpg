import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {routerMiddleware, RouterState} from 'connected-react-router';
import {createBrowserHistory, createMemoryHistory} from 'history';
import createRootReducer from './rootReducer';
import {State} from './types';
import {initialState} from './initialState';

export const isServer = !(
	typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const createReduxStore = (initialState = {}, url = '/') => {
	const preloadedState = isServer ? initialState : window.__INITIAL_STATE__;

	if (!isServer) {
		// @ts-ignore
		delete window.__INITIAL_STATE__;
	}

	const history = isServer ?
		createMemoryHistory({initialEntries: [url]}) :
		createBrowserHistory();
	const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

	const store = configureStore({
		reducer: createRootReducer(history),
		preloadedState,
		middleware,
		devTools: !isServer
	});

	return {store, history};
};

export const getInitialState = (pathname: string = '/'): State => {
	return {
		router: {
			location: {pathname, search: '', hash: '', key: ''},
			initialState: initialState,
			action: 'POP'
		} as unknown as RouterState
	};
};
