import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router} from './router/router'

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('app'));
