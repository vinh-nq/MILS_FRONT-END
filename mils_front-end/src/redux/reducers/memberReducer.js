import { actionRedux } from "../actions/index";

let initialState = {
  listMember: [],
};

export const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.ADD_MEMBER_LIST_CCT_CONFIRM:
      return {
        ...state,
        listMember: [...state.listMember, action.payload],
      };
    case actionRedux.SET_LIST_MEMBER:
      return {
        ...state,
        listMember: [...action.payload],
      };
    case actionRedux.DELETE_MEMBER_LIST_CCT_CONFIRM:
      const newArrayMember = state.listMember.filter(
        (el) => el.MemberId !== action.payload.MemberId
      );
      return {
        ...state,
        listMember: [...newArrayMember],
      };
    default:
      return { ...state };
  }
};
