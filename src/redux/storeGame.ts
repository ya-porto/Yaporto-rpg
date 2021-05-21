import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
	name: 'Game',
	initialState: {

		game:{
			time:  {min: '00', sec: '00'},
			lvl: 1,
	  	}
	},
	reducers: {
		changeTime: (state: any, action: any ) => {
			state.game.time = action.payload
		},
	}
  })
  
  export const {changeTime} = counterSlice.actions
  
  export const store = configureStore({
	  reducer: counterSlice.reducer
  })
  