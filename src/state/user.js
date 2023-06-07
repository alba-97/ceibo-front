/*
import { createAction, createReducer } from "@reduxjs/toolkit";

<<<<<<< HEAD
export const setUser = createAction("SET_USER");
=======
const initialState = ;

export const setUser = createAction("SET_USER");
export const clearUser = createAction("CLEAR_USER");

const reducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
  [clearUser]: (state, action) => {
    return initialState;
  },
});

export default reducer;
*/

import { createSlice } from "@reduxjs/toolkit";
>>>>>>> develop

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
