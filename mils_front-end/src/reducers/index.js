import { combineReducers } from "redux";
import { bookingReducer } from "./bookingReducer";

const appReducers = combineReducers({
  bookingReducer: bookingReducer,
});

export default appReducers;
