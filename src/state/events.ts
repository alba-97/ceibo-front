import EventResponse from "@/interfaces/responses/Event";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EventResponse[] = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (_, action) => {
      return action.payload;
    },
    removeEvent: (state, action) => {
      let newState = [...state];
      newState = newState.filter((item) => item._id !== action.payload);
      return newState;
    },
    addEvent: (state, action) => {
      let newState = [...state];
      newState = newState.concat([action.payload]);
      return newState;
    },
  },
});

export const { setEvents, removeEvent, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
