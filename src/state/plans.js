import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action) => {
      let newState = action.payload;
      if (action.payload.category) {
        newState.category = action.payload.category.name;
      }
      return newState;
    },
  },
});

export const { setPlans } = plansSlice.actions;
export default plansSlice.reducer;
