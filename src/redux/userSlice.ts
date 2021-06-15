import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import merge from 'deepmerge';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {authController} from '../controllers/auth';
import {toggleAuthFlag} from '../utils/toggleAuthFlag';



export const fetchUserBy: any = createAsyncThunk(
	'users/getFullInfo',
	async () => {
		const response = await authController.getUserInfo();
		if(!response['isAuth']) {
            toggleAuthFlag(response)
        }
		return response;
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		mail: null,
		login: null,
		name: null,
		secondName: null,
		nameInChat: null,
		phone: null
	},
	reducers: {
		updateUserData: (state, action) => {
			merge(state, action.payload)
		}
	},
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
			merge(state, action.payload)
		}
	}
});

export const {updateUserData} = userSlice.actions

export default userSlice.reducer
