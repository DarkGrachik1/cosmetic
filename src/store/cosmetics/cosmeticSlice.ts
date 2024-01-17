import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	cosmetic: undefined,
	name: "",
	description: ""
};

const cosmeticSlice = createSlice({
	name: 'cosmetic',
	initialState: initialState,
	reducers: {
		updateCosmetic(state, action) {
			state.cosmetic = action.payload
		},
		updateName(state, action){
			state.name = action.payload
		},
		updateDescription(state, action){
			state.description = action.payload
		}
	}
})

export const {updateCosmetic, updateName, updateDescription} = cosmeticSlice.actions;

export default cosmeticSlice.reducer;