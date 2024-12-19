import UserResponse from "@/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserResponse[] = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (_, action) => action.payload,
  },
});

export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
