import {createSlice, configureStore} from '@reduxjs/toolkit';
import {initialState} from './stateFromSSR';

const counterSlice = createSlice({
	name: 'Character',
	initialState: initialState.character,
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

export const {changeHp, changeArmor, changeDps} = counterSlice.actions;

export const store = configureStore({
	reducer: counterSlice.reducer
});
