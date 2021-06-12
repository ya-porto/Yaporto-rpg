import {createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		time: {min: '00', sec: '00'},
		lvl: 1
	},
	reducers: {
		changeTime: (state: any, action: any) => {
			state.time = action.payload;
		}
	}
});

export const {changeTime} = gameSlice.actions;

export default gameSlice.reducer
