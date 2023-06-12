import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import selectedPlanReducer from "./selectedPlan";
import plansReducer from "./plans";
import contactsReducer from "./contacts";

const reducers = combineReducers({
  user: userReducer,
  plans: plansReducer,
  selectedPlan: selectedPlanReducer,
  contacts: contactsReducer,
});

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: reducers,
});

export default store;
