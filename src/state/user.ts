import UserResponse from "@/interfaces/responses/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserResponse = {
  _id: null,
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  address: "",
  birthdate: "",
  phone: "",
  profile_img: "",
  plans: [],
  history: [],
  preferences: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    updateUser: (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    clearUser: () => initialState,
    setUserPlans: (state, action) => {
      let newState = { ...state };
      newState.plans = action.payload;
      return newState;
    },
    addUserPlan: (state, action) => {
      let newState = { ...state };
      newState.plans = newState.plans.concat([action.payload]);
      return newState;
    },
    removeUserPlan: (state, action) => {
      let newState = { ...state };
      newState.plans = newState.plans.filter(
        (item) => item._id !== action.payload
      );
      return newState;
    },
    setPlanHistory: (state, action) => {
      let newState = { ...state };
      newState.history = action.payload;
      return newState;
    },
    setPreferences: (state, action) => {
      let newState = { ...state };
      newState.preferences = action.payload;
      return newState;
    },
    removePlanFromUser: (state, action) => {
      let newState = { ...state };
      newState.plans = newState.plans.filter(
        (item) => item._id !== action.payload
      );
      newState.history = newState.history.filter(
        (item) => item._id !== action.payload
      );
      return newState;
    },
  },
});

export const {
  setUser,
  updateUser,
  clearUser,
  setUserPlans,
  addUserPlan,
  removeUserPlan,
  setPlanHistory,
  setPreferences,
  removePlanFromUser,
} = userSlice.actions;
export default userSlice.reducer;
