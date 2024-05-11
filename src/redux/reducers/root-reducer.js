import { combineReducers } from "redux";
import { LoginReducers } from "./login-reducer";
import { imageReducer } from "./image-reducer";
import { AuthorReducer } from "./author.reducer";
import { ArticleEditReducer, TourEditReducer } from "./article-edit-reducer";
import { OemNameReducer } from "./carsReducers/oemNameReducer";
import { CarRentalEditReducer } from "./article-edit-reducer";
import { ModelNameReducer } from "./carsReducers/modelNameReducer";


export const rootReducer = combineReducers({
  LoginReducers,
  imageReducer,
  AuthorReducer: AuthorReducer,
  ArticleEditReducer,
  TourEditReducer,
  OemNameReducer,
  ModelNameReducer,
  CarRentalEditReducer,
  ModelNameReducer,

});
