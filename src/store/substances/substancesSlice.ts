import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	substances: [],
	query: ""
};

const substancesSlice = createSlice({
	name: 'substances',
	initialState: initialState,
	reducers: {
		updateSubstances(state, action) {
			state.substances = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateSubstances,
	updateQuery
} = substancesSlice.actions;

export default substancesSlice.reducer;