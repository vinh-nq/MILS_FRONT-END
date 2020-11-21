import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { userReducer } from "./userReducer";
import { languageReducer } from "./languageReducer";
import { cctReducer } from "./cctReducer";
import { memberReducer } from "./memberReducer";
import { CMRequestReducer } from "./CMRequestReducer";
import { HouseholdRequestedReducer } from "./HouseholdRequestedReducer";
import { districtApproveReducer } from "./districtApproveReducer";
import { centralApproveReducer } from "./centralApproveReducer";

const appReducers = combineReducers({
  historyReducer,
  userReducer,
  languageReducer,
  cctReducer: cctReducer,
  memberReducer: memberReducer,
  CMRequestReducer: CMRequestReducer,
  HouseholdRequestedReducer: HouseholdRequestedReducer,
  districtApproveReducer: districtApproveReducer,
  centralApproveReducer: centralApproveReducer,
});

export default appReducers;
