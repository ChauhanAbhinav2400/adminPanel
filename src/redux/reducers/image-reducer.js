const intialState = {
  imageArticle: "",
  imageTour: {},
  imageCar: {},
  imageTour1: {},
  imageTour2: {},
  imageTour3: {},
  imageTour4: {},
  teamImage:"",
  vendorImage:"",
  touristPlaceImage:"",
  multipleImage:[]
};

export const imageReducer = (state = intialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case "ADD_ARTICLE_IMAGE":
      return {
        ...state,
        imageArticle: payload,
      };
    case "ADD_TOUR_IMAGE":
      return {
        ...state,
        imageTour: payload,
      };
    case "ADD_CAR_IMAGE":
      return {
        ...state,
        imageCar: payload,
      };
    case "ADD_TOUR_0_IMAGE":
      return {
        ...state,
        imageTour1: payload,
      };
    case "ADD_TOUR_1_IMAGE":
      return {
        ...state,
        imageTour2: payload,
      };
    case "ADD_TOUR_2_IMAGE":
      return {
        ...state,
        imageTour3: payload,
      };
    case "ADD_TOUR_3_IMAGE":
      return {
        ...state,
        imageTour4: payload,
      };
      case "ADD_Team_IMAGE":
      return {
        ...state,
        teamImage: payload,
      };
      case "ADD_VENDOR_IMAGE":
      return {
        ...state,
        vendorImage: payload,
      };
      case "ADD_TOURISTPLACE_IMAGE":
      return {
        ...state,
        touristPlaceImage: payload,
      };
      case "ADD_MULTIPLE_IMAGE":
        return {
          ...state,
          multipleImage: [...state.multipleImage, payload.imgUrl]
        };
      
    default:
      return state;
  };
  
};

//ADD_Team_IMAGE