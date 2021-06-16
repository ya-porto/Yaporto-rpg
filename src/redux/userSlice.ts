import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authController} from '../controllers/auth';
import merge from 'deepmerge';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();
		return response;
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		mail: null,
		login: null,
		name: null,
		secondName: null,
		nameInChat: null,
		phone: null
	},
	reducers: {
		updateUserData: (state, action) => {
			merge(state, action.payload);
		}
	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			merge(state, action.payload);
		}
	}
});

export const {updateUserData} = userSlice.actions;

export default userSlice.reducer;
