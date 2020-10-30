import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { userReducer } from "./userReducer";
import { languageReducer } from "./languageReducer";

const appReducers = combineReducers({
  historyReducer,
  userReducer,
  languageReducer,
});

export default appReducers;
