import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { thunk } from "redux-thunk";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { rootReducer } from "./redux/reducers/root-reducer.js";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
);
