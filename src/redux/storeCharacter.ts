import {createSlice, configureStore} from '@reduxjs/toolkit';
import {getWindow} from 'ssr-window';
import {isServer} from './rootStore';

const window = getWindow();

const initialState = isServer ? {} : window.__INITIAL_STATE__.router.initialState;
console.log(initialState);

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
