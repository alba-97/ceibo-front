import { createAction, createReducer } from "@reduxjs/toolkit";

const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  username: null,
  password: null,
  first_name: null,
  last_name: null,
  email: null,
  birthdate: null,
  phone: null,
  profile_img: null,
};

export const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});
