import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer";
import searchReducer from "./searchReducer";
import themeReducer from "./themeReducer";
import filtersReducer from './filtersReducer'

export default combineReducers({
	favoriteReducer,
	themeReducer,
	searchReducer,
	filtersReducer
});
