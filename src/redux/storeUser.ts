import {createSlice, configureStore} from '@reduxjs/toolkit';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


const counterSlice = createSlice({
	name: 'User',
	initialState: {
		user: {
			isAuth: false,
			mail: null,
			login: null,
			name: null,
			secondName: null,
			nameInChat: null,
			phone: null
		}
	},
	reducers: {

	}
});

export const store = configureStore({
	reducer: counterSlice.reducer
});
