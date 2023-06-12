import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import selectedPlanReducer from "./selectedPlan";
import plansReducer from "./plans";
import contactsReducer from "./contacts";
import selectedContactReducer from "./selectedContact";

const reducers = combineReducers({
  user: userReducer,
  plans: plansReducer,
  selectedPlan: selectedPlanReducer,
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
