import { actionRedux } from "../actions/index";

let initialState = {
  listItems: [],
  page: 1,
  keyword: "",
  region: "all",
};

export const districtApproveReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.ADD_DISTRICT_APPROVE:
      return {
        ...state,
        listItems: [...state.listItems, action.payload],
      };
    case actionRedux.SET_LIST_DISTRICT_APPROVE:
      return {
        ...state,
        listItems: [...action.payload],
      };
    case actionRedux.DELETE_DISTRICT_APPROVE:
      const newArrayMember = state.listItems.filter(
        (el) => el.hh_id !== action.payload.hh_id
      );
      return {
        ...state,
        listItems: [...newArrayMember],
      };
    case actionRedux.UPDATE_STATUS_PAGE_ON_DISTRICT_APPROVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
