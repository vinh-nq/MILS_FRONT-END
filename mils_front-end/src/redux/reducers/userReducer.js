import { actionRedux } from "../actions/index";

let initialState = {
  userInformation: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.FETCH_DATA_USER:
      return { ...state, userInformation: action.payload };
    default:
      return { ...state };
  }
};
