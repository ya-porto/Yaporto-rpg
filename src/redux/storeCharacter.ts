import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
	name: 'Character',
	initialState: {
		character:{
			startedHp: 100,
			startedArmor: 0,
			startedDps: 10,
			lvl: 1,
			exp: 0,
		},
	},
	reducers: {
		changeHp: (state: any, action: any) => {
			state.character.startedHp += action.payload
		},
		
		changeArmor: (state: any, action: any) => {
			state.character.startedArmor += action.payload
		},

		changeDps: (state: any, action: any) => {
			state.character.startedDps += action.payload
		},
	}
  })
  
  export const { changeHp , changeArmor, changeDps} = counterSlice.actions
  
  export const store = configureStore({
	  reducer: counterSlice.reducer
  })
  