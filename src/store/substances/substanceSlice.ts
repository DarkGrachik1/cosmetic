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
		}
	}
})

export const {
	updateSubstance
} = substanceSlice.actions;

export default substanceSlice.reducer;