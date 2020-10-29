import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";

const appReducers = combineReducers({
  historyReducer,
});

export default appReducers;
