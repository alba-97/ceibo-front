import { createAction, createReducer } from "@reduxjs/toolkit";

export const setPlans = createAction("SET_PLANS");

const initialState = [];

export const plansReducer = createReducer(initialState, {
  [setPlans]: (state, action) => action.payload,
});
