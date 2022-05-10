import {
	SAVE_SEARCH_RESULTS,
} from "@store/constants/actionTypes";
import { getLocalStorage } from "@utils/localStorage";

const initialState = getLocalStorage("search");

const searchReducer = (state=initialState , action) => {
    const searchResults = action.payload;
	switch (action.type) {
		case SAVE_SEARCH_RESULTS:
			return searchResults
		default:
			return state;
	}
};

export default searchReducer;
