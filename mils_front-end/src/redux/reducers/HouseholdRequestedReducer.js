import { actionRedux } from "../actions/index";

let initialState = {
  listItems: [],
  page: 1,
  keyword: "",
  region: "all",
};

export const HouseholdRequestedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.ADD_CM_REQUESTED_ITEM:
      return {
        ...state,
        listItems: [...state.listItems, action.payload],
      };
    case actionRedux.SET_LIST_CM_REQUESTED:
      return {
        ...state,
        listItems: [...action.payload],
      };
    case actionRedux.DELETE_CM_REQUESTED_ITEM:
      const newArrayMember = state.listItems.filter(
        (el) => el.hh_id !== action.payload.hh_id
      );
      return {
        ...state,
        listItems: [...newArrayMember],
      };
    case actionRedux.UPDATE_STATUS_PAGE_ON_REQUESTED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};