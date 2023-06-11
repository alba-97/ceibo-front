import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  email: null,
  username: null,
  last_name: null,
  email: null,
  birthdate: null,
  phone: null,
  profile_img: null,
  plans: [],
  preferences: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => initialState,
    setUserPlans: (state, action) => {
      const newState = { ...state };
      newState.plans = action.payload;
      return newState;
    },
  },
});

export const { setUser, clearUser, setUserPlans } = userSlice.actions;
export default userSlice.reducer;
