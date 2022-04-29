import {
	CHANGE_THEME,
} from "@store/constants/actionTypes";
import { getLocalStorage } from "@utils/localStorage";
import { changeCSSVariables } from "@services/changeCSSVariables";

const initialState = getLocalStorage("theme");

const themeReducer = (state = initialState || {}, action) => {
    const theme = action.payload;
	switch (action.type) {
		case CHANGE_THEME:
			changeCSSVariables(theme);
			return theme
		default:
			return state;
	}
};

export default themeReducer;
