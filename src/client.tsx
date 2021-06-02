import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {createReduxStore} from './redux/rootStore';

const {store, history} = createReduxStore();

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

ReactDOM.hydrate(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);
