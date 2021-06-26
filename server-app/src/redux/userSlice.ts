import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {authController} from '../controllers/auth';
import {sliceNames} from './slicenames';

const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();
		response['isAuth'] = true
		return response;
	}
);

const userInitialState = {
	isAuth: false,
	email: null,
	login: null,
	first_name: null,
	second_name: null,
	display_name: null,
	phone: null,
	theme: 'light',
	themes: []
};

const userSlice = createSlice({
	name: sliceNames.user,
	initialState: userInitialState,
	reducers: {
		updateTheme: (state, action) => {
			state.theme = action.payload
		},
		updateUserData: (state, action) => {
			state.display_name = action.payload.display_name
			state.email = action.payload.email
			state.login = action.payload.login
			state.first_name = action.payload.first_name
			state.second_name = action.payload.second_name
			state.phone = action.payload.phone
			state.theme = action.payload.theme
			state.isAuth = action.payload.isAuth
		},
		resetUserData: state => {
			Object.assign(state, userInitialState)
		}
	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			state.display_name = action.payload.display_name
			state.email = action.payload.email
			state.login = action.payload.login
			state.first_name = action.payload.first_name
			state.second_name = action.payload.second_name
			state.phone = action.payload.phone
			state.theme = action.payload.theme
			state.isAuth = action.payload.isAuth
		}
	}
});

export const {updateUserData, resetUserData, updateTheme} = userSlice.actions;
export {fetchUserBy}

export default userSlice.reducer;
