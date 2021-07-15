import ReactDOM from 'react-dom';
import {loadableReady} from '@loadable/component';
import {Provider} from 'react-redux';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {getWindow} from 'ssr-window';

import {IS_DEV} from '../../webpack/env';
import {isServer} from '../utils/isServerEnvChecker';
import {createStore, reducers} from '../redux/rootStore';
import {App} from '../components/App';
import {ErrorBoundary} from '../components/errorBoundary/errorBoundary';
import {ForumContext} from '../utils/forumContext';
import '../styles/style.css';

declare global {
	interface Window {
			storage: {threads: any[], comments: any[]},
			__INITIAL_STATE__: {};
			__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
	}
}

const initialState = isServer ? getWindow().__INITIAL_STATE__ : window.__INITIAL_STATE__;

export const store = createStore(reducers, initialState);

if(!isServer) {
	const forum = isServer ? getWindow().storage : window.storage;
	localStorage.setItem('forum', JSON.stringify(forum))
}

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

if (!isServer) {
	loadableReady(() => {
		ReactDOM.hydrate(
			<Provider store={store}>
				<BrowserRouter>
					<ForumContext.Provider value={JSON.parse(localStorage.forum)}>
						<ErrorBoundary>
							<App />
						</ErrorBoundary>
					</ForumContext.Provider>	
				</BrowserRouter>
			</Provider>,
			document.getElementById('app')
		);
	});
}
