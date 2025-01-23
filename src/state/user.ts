import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import { createSlice } from "@reduxjs/toolkit";

interface UserState extends UserResponse {
  recommendedEvents: EventResponse[];
  createdEvents: EventResponse[];
}

const initialState: UserState = {
  _id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  address: "",
  birthdate: "",
  phone: "",
  profile_img: "",
  events: [],
  createdEvents: [],
  recommendedEvents: [],
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
    setUserEvents: (state, action) => {
      let newState = { ...state };
      newState.events = action.payload;
      return newState;
    },
    setCreatedEvents: (state, action) => {
      let newState = { ...state };
      newState.createdEvents = action.payload;
      return newState;
    },
    setRecommendedEvents: (state, action) => {
      let newState = { ...state };
      newState.recommendedEvents = action.payload;
      return newState;
    },
    addUserEvent: (state, action) => {
      let newState = { ...state };
      newState.events = newState.events.concat([action.payload]);
      return newState;
    },
    removeUserEvent: (state, action) => {
      let newState = { ...state };
      newState.events = newState.events.filter(
        (item) => item._id !== action.payload
      );
      return newState;
    },
    setPreferences: (state, action) => {
      let newState = { ...state };
      newState.preferences = action.payload;
      return newState;
    },
    removeEventFromUser: (state, action) => {
      let newState = { ...state };
      newState.events = newState.events.filter(
        (item) => item._id !== action.payload
      );
      newState.createdEvents = newState.createdEvents.filter(
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
  setCreatedEvents,
  setRecommendedEvents,
  setUserEvents,
  addUserEvent,
  removeUserEvent,
  setPreferences,
  removeEventFromUser,
} = userSlice.actions;
export default userSlice.reducer;
