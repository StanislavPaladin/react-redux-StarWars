export const favoritesSelector = (state) => state.favoriteReducer;

export const themeSelector = (state) => state.themeReducer;

export const searchResultsSelector = (state) => state.searchReducer;

export const allPeopleSelector = (state) => state.filtersReducer.people;
export const checkedFilters = (state) => state.filtersReducer.filters;
