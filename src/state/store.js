<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { selectedPlanReducer } from "./selectedPlan";
import { plansReducer } from "./plans";

export const store = configureStore({
  reducer: {
    user: userReducer,
    plans: plansReducer,
    selectedPlan: selectedPlanReducer,
  },
=======
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";

const reducers = combineReducers({
  user: userReducer,
>>>>>>> develop
});

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: reducers,
});

export default store;
