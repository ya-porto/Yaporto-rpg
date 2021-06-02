import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {History} from 'history';

import {State} from './types';

export default (history: History) =>
	combineReducers<State>({
		router: connectRouter(history)
	});
