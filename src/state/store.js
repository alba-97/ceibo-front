import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";

const reducers = combineReducers({
  user: userReducer,
});

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: reducers,
});

export default store;
