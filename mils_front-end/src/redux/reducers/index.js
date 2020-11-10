import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { userReducer } from "./userReducer";
import { languageReducer } from "./languageReducer";
import { cctReducer } from "./cctReducer";

const appReducers = combineReducers({
  historyReducer,
  userReducer,
  languageReducer,
  cctReducer: cctReducer,
});

export default appReducers;
