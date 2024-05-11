const initialState = {
  editFormData: {},
};

export const ArticleEditReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ARTICLE_BY_ID":
      return {
        ...state,
        editFormData: payload,
      };

    default:
      return state;
  }
};

export const TourEditReducer = (state = { editTourFormData: {} }, action) => {
  const { type, payload } = action;
  console.log(type, payload);
  switch (type) {
    case "GET_TOUR_BY_ID":
      return {
        ...state,
        editTourFormData: payload,
      };

    default:
      return state;
  }
};

export const CarRentalEditReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_RENTAL_CAR_BY_ID":
      return {
        ...state,
        editFormData: payload,
      };

    default:
      return state;
  }
};
