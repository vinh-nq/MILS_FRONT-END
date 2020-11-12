import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { userReducer } from "./userReducer";
import { languageReducer } from "./languageReducer";
import { cctReducer } from "./cctReducer";
import { memberReducer } from "./memberReducer";

const appReducers = combineReducers({
  historyReducer,
  userReducer,
  languageReducer,
  cctReducer: cctReducer,
  memberReducer: memberReducer,
});

export default appReducers;
