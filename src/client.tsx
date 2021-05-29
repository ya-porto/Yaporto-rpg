import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router} from './router/router';
import {ErrorBoundary} from './components/errorBoundary/errorBoundary';

// Этот файл нам будет не нужен, оставлю пока не втащили роутер и стор в ssr

if ('serviceWorker' in navigator) {
	console.log('here');
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

ReactDOM.render((
	<ErrorBoundary>
		<Router>
			<App />
		</Router>
	</ErrorBoundary>
), document.getElementById('app'));
