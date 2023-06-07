import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action) => action.payload,
  },
});

export const { setPlans } = plansSlice.actions;
export default plansSlice.reducer;
