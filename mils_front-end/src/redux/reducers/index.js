import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { userReducer } from "./userReducer";

const appReducers = combineReducers({
  historyReducer,
  userReducer,
});

export default appReducers;
