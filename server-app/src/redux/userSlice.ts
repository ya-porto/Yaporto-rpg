import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {authController} from '../controllers/auth';
import {userController} from '../controllers/user';
import {sliceNames} from './slicenames';

const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();
		response['isAuth'] = true
		 
		return response;
	}
);

const getAllThemes: any = createAsyncThunk(
	'getThemes',
	async () => {
		const response = await userController.getAllThemes();
		return response;
	}
)

const getUserTheme: any = createAsyncThunk(
	'getUserThemes',
	async (id: number) => {
		const response = await userController.getUserTheme(id);
		return response;
	}
)

const userInitialState = {
	id: null,
	first_name: null,
	second_name: null,
	display_name: null,
	login: null,
	avatar: null,
	email: null,
	phone: null,
	isAuth: false,
	theme: 'light',
	themes: null,
};

const userSlice = createSlice({
	name: sliceNames.user,
	initialState: {
		isAuth: userInitialState.isAuth,
		email: userInitialState.email,
		login: userInitialState.login,
		first_name: userInitialState.first_name,
		second_name: userInitialState.second_name,
		display_name: userInitialState.display_name,
		avatar: userInitialState.avatar,
		phone: userInitialState.phone,
		theme: 'light',
		themes: [],
	},
	reducers: {
		updateTheme: (state, action) => {
			state.theme = action.payload
		},
		updateUserData: (state, action) => {
			Object.assign(state, action.payload)
		},
		resetUserData: state => {
			Object.assign(state, userInitialState)
		}
	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			Object.assign(state, action.payload)
		},
		[getAllThemes.fulfilled]: (state, action) => {
			state.themes = action.payload
		},
		[getUserTheme.fulfilled]: (state, action) => {
			state.theme = action.payload
		}
	}
});

export const {updateUserData, resetUserData, updateTheme} = userSlice.actions;
export {fetchUserBy, getAllThemes, getUserTheme, userInitialState}

export default userSlice.reducer;
