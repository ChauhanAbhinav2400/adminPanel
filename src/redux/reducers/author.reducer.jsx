const initialState = {
  authorList: [],
};

export const AuthorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "AUTHOR_DATA":
      return {
        ...state,
        authorList: payload,
      };

    default:
      return state;
  }
};
