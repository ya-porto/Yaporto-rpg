import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {routerMiddleware, RouterState} from 'connected-react-router';
import {createBrowserHistory, createMemoryHistory} from 'history';
import createRootReducer from './rootReducer';

export const isServer = !(
	typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const createReduxStore = (initialState = {}, url = '/') => {
	// eslint-disable-next-line no-negated-condition
	const preloadedState = !isServer ? window.__INITIAL_STATE__ : initialState;

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

export const getInitialState = (pathname: string = '/'): RootState => {
	return {
		router: {
			location: {pathname, search: '', hash: '', key: ''},
			action: 'POP'
		} as unknown as RouterState
	};
};
