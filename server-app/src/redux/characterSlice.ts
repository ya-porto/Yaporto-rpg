import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from './slicenames';

export const characterSlice = createSlice({
	name: sliceNames.character,
	initialState: {
		startedHp: 110,
		startedArmor: 0,
		startedDps: 15,
		lvl: 1,
		exp: 0,
	},
	reducers: {
		changeHp: (state: any, action: any) => {
			state.startedHp += action.payload;
		},
		changeCurrentHp: (state: any, action: any) => {
			state.startedHp = action.payload;
		},
		changeArmor: (state: any, action: any) => {
			state.startedArmor += action.payload;
		},
		changeDps: (state: any, action: any) => {
			state.startedDps += action.payload;
		}
	}
});

export const {changeHp, changeArmor, changeCurrentHp, changeDps} = characterSlice.actions;

export default characterSlice.reducer;
