import UserResponse from "@/interfaces/responses/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserResponse = {
  _id: "",
  address: "",
  birthdate: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  profile_img: "",
  username: "",
  plans: [],
  history: [],
  preferences: [],
};

const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    setSelectedContact: (_, action) => action.payload,
  },
});

export const { setSelectedContact } = selectedContactSlice.actions;
export default selectedContactSlice.reducer;
