import { actionRedux } from "../actions/index";

let initialState = {
  listBreadcrumb: [],
  id: null,
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.FETCH_DATA_BREADCRUMB:
      return {
        ...state,
        listBreadcrumb: action.payload.listBreadcrumb,
        id: action.payload.id,
      };
    default:
      return { ...state };
  }
};
