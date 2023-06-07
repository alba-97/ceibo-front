import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedPlan = createAction("SET_SELECTED_PLAN");

const initialState = {
  id: null,
  title: null,
  description: null,
  img: null,
  event_date: null,
  created_at: null,
  min_age: null,
  max_age: null,
  min_to_pay: null,
  total_to_pay: null,
  deadline_to_pay: null,
  link_to_pay: null,
  category: null,
  start_time: null,
  end_time: null,
};

export const selectedPlanReducer = createReducer(initialState, {
  [setSelectedPlan]: (state, action) => action.payload,
});
