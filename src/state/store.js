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
});
