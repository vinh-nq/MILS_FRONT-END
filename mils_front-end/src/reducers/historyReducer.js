let initialState = {
  listBreadcrumb: [],
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_BREADCRUMB":
      return { ...state, listBreadcrumb: action.payload };
    default:
      return { ...state };
  }
};
