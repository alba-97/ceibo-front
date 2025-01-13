import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: false,
  refresh: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setRefetch: (state) => ({ ...state, refetch: !state.refetch }),
    setRefresh: (state) => ({ ...state, refresh: !state.refresh }),
  },
});

export const { setRefetch, setRefresh } = commonSlice.actions;
export default commonSlice.reducer;
