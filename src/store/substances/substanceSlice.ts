import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	substance: undefined,
};

const substanceSlice = createSlice({
	name: 'substance',
	initialState: initialState,
	reducers: {
		updateSubstance(state, action) {
			state.substance = action.payload
		},
		updateName(state, action) {
			state.substance.name = action.payload
		},
		updateDescription(state, action) {
			state.substance.description = action.payload
		},
		updateHeatOutput(state, action) {
			state.substance.heat_output = action.payload
		},
		updateImage(state, action) {
			state.substance.image = action.payload
		}
	}
})

export const {
	updateSubstance,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} = substanceSlice.actions;

export default substanceSlice.reducer;