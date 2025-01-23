import EventResponse from "@/interfaces/responses/Event";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EventResponse[] = [];

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (_, action) => {
      return action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
