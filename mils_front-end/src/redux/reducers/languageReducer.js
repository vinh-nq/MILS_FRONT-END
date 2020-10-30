import { actionRedux } from "../actions/index";

let initialState = {
  objectLanguage: [],
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionRedux.ADD_LANGUAGE:
      return { ...state, objectLanguage: action.payload };
    default:
      return { ...state };
  }
};
