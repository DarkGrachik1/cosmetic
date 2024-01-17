import {configureStore} from "@reduxjs/toolkit";

import substanceReducer from "./substances/substanceSlice"
import draftCosmeticReducer from "./cosmetics/cosmeticSlice"
import authReducer from "./users/authSlice"
import cosmeticsReducer from "./cosmetics/cosmeticsSlice"
import substancesReducer  from "./substances/substancesSlice"

export default configureStore({
	reducer: {
		substance: substanceReducer,
		substances: substancesReducer,
		cosmetic: draftCosmeticReducer,
		cosmetics: cosmeticsReducer,
		user: authReducer
	}
});