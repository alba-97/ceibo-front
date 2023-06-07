import { createSlice } from "@reduxjs/toolkit";

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

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action) => action.payload,
  },
});

export const { setPlans } = plansSlice.actions;
export default plansSlice.reducer;
