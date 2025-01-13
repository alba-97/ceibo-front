import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import selectedPlanReducer from "./selectedPlan";
import plansReducer from "./plans";
import contactsReducer from "./contacts";
import selectedContactReducer from "./selectedContact";
import historyReducer from "./history";
import commonReducer from "./common";

export interface RootState {
  user: ReturnType<typeof userReducer>;
  selectedPlan: ReturnType<typeof selectedPlanReducer>;
  plans: ReturnType<typeof plansReducer>;
  contacts: ReturnType<typeof contactsReducer>;
  selectedContact: ReturnType<typeof selectedContactReducer>;
  history: ReturnType<typeof historyReducer>;
  common: ReturnType<typeof commonReducer>;
}

const reducers = combineReducers({
  user: userReducer,
  plans: plansReducer,
  selectedPlan: selectedPlanReducer,
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
  history: historyReducer,
  common: commonReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
