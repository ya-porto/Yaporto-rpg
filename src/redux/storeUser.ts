import {createAsyncThunk, createSlice, configureStore} from '@reduxjs/toolkit';
import {authController} from '../controllers/auth';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {initialState} from './stateFromSSR';

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
