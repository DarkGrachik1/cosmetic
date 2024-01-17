import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	cosmetic: undefined,
	cosmetic_id: undefined
};

const cosmeticSlice = createSlice({
	name: 'cosmetic',
	initialState: initialState,
	reducers: {
		updateCosmetic(state, action) {
			state.cosmetic = action.payload
		},
		updateCosmeticId(state, action) {
			state.cosmetic_id = action.payload
		},
		updateName(state, action) {
			state.cosmetic.name = action.payload
		},
		updateDescription(state, action) {
			state.cosmetic.description = action.payload
		},
		updateSubstance(state, action) {
			const newTodos = state.cosmetic.substances.filter(substance => substance.id !== action.payload.id)
			state.cosmetic.substances = [action.payload, ...newTodos].sort(function(first, second) {
				return first.id - second.id;
			})
		}
	}
})

export const {
	updateCosmetic,
	updateName,
	updateDescription,
	updateCosmeticId,
	updateSubstance
} = cosmeticSlice.actions;

export default cosmeticSlice.reducer;