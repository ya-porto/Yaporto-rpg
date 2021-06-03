import './styles/style.css';

import ReactDOM from 'react-dom';
import {App} from './components/App';
import {loadableReady} from '@loadable/component';

import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {createReduxStore} from './redux/rootStore';
import {State} from './redux/types';
import React from 'react';

const {store, history} = createReduxStore(window.__INITIAL_STATE__);

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

declare global {
	interface Window {
			__INITIAL_STATE__: State;
			__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
	}
}

loadableReady(() => {
	ReactDOM.hydrate(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('app')
	);
});
