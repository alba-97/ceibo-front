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
  comments: [],
  organizer: {},
  ended: false,
};

const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => action.payload,
    setOrganizer: (state, action) => {
      let newState = { ...state };
      newState.organizer = action.payload;
      return newState;
    },
  },
});

export const { setSelectedPlan, setOrganizer } = selectedPlanSlice.actions;
export default selectedPlanSlice.reducer;
