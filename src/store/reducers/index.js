import { combineReducers } from "redux";
import  favoriteReducer  from "./favoriteReducer";
import  themeReducer  from "./themeReducer";

export default combineReducers({ favoriteReducer, themeReducer });
