import '../styles/style.css';
import ReactDOM from 'react-dom';
import {App} from '../components/App';
import {loadableReady} from '@loadable/component';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {RootState, characterReducer, gameReducer, userReducer} from '../redux/rootStore';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {IS_DEV} from '../../webpack/env';

const initialState = window.__INITIAL_STATE__;
// Сюда добавить редьюсер
const store = configureStore({
	preloadedState: initialState,
	reducer: {
		game: gameReducer,
		user: userReducer,
		character: characterReducer
	}
});

if (!IS_DEV) {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function (reg) {
			if (reg.installing) {
				console.log('Service worker installing');
			} else if (reg.waiting) {
				console.log('Service worker installed');
			} else if (reg.active) {
				console.log('Service worker active');
			}
		}).catch(function (error) {
			console.log('Registration failed with ' + error);
		});
	}
}

declare global {
	interface Window {
			__INITIAL_STATE__: RootState;
			__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
	}
}

loadableReady(() => {
	ReactDOM.hydrate(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	);
});
