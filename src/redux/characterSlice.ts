import {createSlice} from '@reduxjs/toolkit';

export const characterSlice = createSlice({
	name: 'character',
	initialState: {
		startedHp: 100,
		startedArmor: 0,
		startedDps: 10,
		lvl: 1,
		exp: 0
	},
	reducers: {
		changeHp: (state: any, action: any) => {
			state.startedHp += action.payload;
		},

		changeArmor: (state: any, action: any) => {
			state.startedArmor += action.payload;
		},
		changeDps: (state: any, action: any) => {
			state.startedDps += action.payload;
		}
	}
});

export const {changeHp, changeArmor, changeDps} = characterSlice.actions;

export default characterSlice.reducer
