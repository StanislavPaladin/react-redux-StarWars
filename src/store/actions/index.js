import { ADD_PERSON_TO_FAVORITE, REMOVE_PERSON_FROM_FAVORITE, CHANGE_THEME, SAVE_SEARCH_RESULTS } from "@store/constants/actionTypes";

export const setPersonToFavorite = (person) => ({
    type: ADD_PERSON_TO_FAVORITE,
    payload: person
});

export const removePersonFromFavorite = (personId) => ({
    type: REMOVE_PERSON_FROM_FAVORITE,
    payload: personId
});

export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: theme
});

export const saveSearchResults = (searchResults) => ({
    type: SAVE_SEARCH_RESULTS,
    payload: searchResults
})