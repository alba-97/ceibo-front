import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  email: null,
  username: null,
  last_name: null,
  email: null,
  birthdate: null,
  phone: null,
  profile_img: null,
};

export const setUser = createAction("SET_USER");

const reducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
});

export default reducer;
