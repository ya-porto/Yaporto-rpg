import {createAsyncThunk, createSlice, configureStore} from '@reduxjs/toolkit';
import {authController} from '../controllers/auth';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {getWindow} from 'ssr-window';
import {isServer} from './rootStore';

const window = getWindow();

const initialState = isServer ? {} : window.__INITIAL_STATE__.router.initialState;
console.log(initialState);

export const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();
		return response;
	}
);

const counterSlice = createSlice({
	name: 'User',
	initialState: initialState.user,
	reducers: {

	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			state.user = action.payload;
		}
	}
});

export const store = configureStore({
	reducer: counterSlice.reducer
});
