import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router} from './router/router';
import {ErrorBoundary} from './components/errorBoundary/errorBoundary';

ReactDOM.render((
	<ErrorBoundary>
	<Router>
		<App />
	</Router>
	</ErrorBoundary>
), document.getElementById('app'));
