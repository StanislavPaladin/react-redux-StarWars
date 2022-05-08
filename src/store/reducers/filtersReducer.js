import {
	FETCH_ALL_PEOPLE,
	SAVE_CHECKED_FILTERS,
} from "@store/constants/actionTypes";
import { getLocalStorage } from "@utils/localStorage";

const initialState = getLocalStorage("allPeople");

const filtersReducer = (state = initialState || "", action) => {
	switch (action.type) {
		case FETCH_ALL_PEOPLE:
			return { people: action.payload };
		case SAVE_CHECKED_FILTERS:
			return {
				...state,
				filters: action.payload,
			};
		default:
			return state;
	}
};

export default filtersReducer;
