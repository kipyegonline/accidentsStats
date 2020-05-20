import { createStore } from "redux";
import rootReducer from "./rootReducer";
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;
export const store = createStore(rootReducer, devtools);
