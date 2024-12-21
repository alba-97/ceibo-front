import EventForm from "@/interfaces/forms/Event";
import EventResponse from "@/interfaces/responses/Event";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EventResponse = {
  _id: "",
  title: "",
  description: "",
  location: "",
  img: "",
  start_date: "",
  category: { _id: "", name: "" },
  end_date: "",
  comments: [],
  organizer: {
    _id: "",
    email: "",
    username: "",
    address: "",
    birthdate: "",
    first_name: "",
    last_name: "",
    phone: "",
    profile_img: "",
    plans: [],
    history: [],
    preferences: [],
  },
  ended: false,
  private: false,
};

const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState,
  reducers: {
    setSelectedPlan: (_, action) => {
      return action.payload;
    },
    updateSelectedPlan: (state, action: { payload: Partial<EventForm> }) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    setOrganizer: (state, action) => {
      let newState = { ...state };
      newState.organizer = action.payload;
      return newState;
    },
    clearSelectedPlan: () => {
      return initialState;
    },
    setComments: (state, action) => {
      let newState = { ...state };
      newState.comments = newState.comments.concat([action.payload]);
      return newState;
    },
  },
});

export const {
  setSelectedPlan,
  updateSelectedPlan,
  setOrganizer,
  setComments,
  clearSelectedPlan,
} = selectedPlanSlice.actions;
export default selectedPlanSlice.reducer;
