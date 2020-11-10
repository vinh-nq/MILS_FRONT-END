import { actionRedux } from "../actions/index";
let initialState = {
  cctCascader: null,
};

export const cctReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.FILTER_CASCADER:
      const dataPayload = action.payload;
      return { ...state, cctCascader: dataPayload };
    default:
      return { ...state };
  }
};
