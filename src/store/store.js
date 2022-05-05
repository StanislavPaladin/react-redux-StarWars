import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { setLocalStorage } from "@utils/localStorage";
import rootReducer from "./reducers";
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
// subscription to any changes in store to set data to localstorage
store.subscribe(() => {
	setLocalStorage('store', store.getState().favoriteReducer);
    setLocalStorage('theme', store.getState().themeReducer);
	setLocalStorage('search', store.getState().searchReducer);
});

export default store;
