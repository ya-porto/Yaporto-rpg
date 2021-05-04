import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import {Forum} from './pages/forum/forum';
import {threadMock} from './mocks/forumMocks'

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('app'));
=======
ReactDOM.render(<Forum threads={threadMock}/>, document.getElementById('app'));
>>>>>>> создана страница форума
