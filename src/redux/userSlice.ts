import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {authController} from '../controllers/auth';
import {setAuthFlag} from '../utils/setAuthFlag';

export const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();

		if (!response['isAuth']) {
			setAuthFlag(response, true);
		}

		return response;
	}
);

const initialState = {
	isAuth: false,
	email: null,
	login: null,
	first_name: null,
	second_name: null,
	display_name: null,
	phone: null,
	lightTheme: true
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updateUserData: (state, action) => {
			Object.assign(state, action.payload);
		},
		resetUserData: state => {
			Object.assign(state, initialState)
		}
	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			Object.assign(state, action.payload);
		}
	}
});

export const {updateUserData, resetUserData} = userSlice.actions;

export default userSlice.reducer;
