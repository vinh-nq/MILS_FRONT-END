let initialState = {
  dataBooking: null,
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_BOOKING":
      const dataPayload = action.payload;
      return { ...state, dataPayload };
    default:
      return { ...state };
  }
};
