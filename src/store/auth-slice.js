import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setUserDetails: (state, action) => {
      return action.payload;
    },
    removeAuthDetails: (state, action) => {
      return null;
    },
  },
});

export const { setUserDetails, removeAuthDetails } = authSlice.actions;
export default authSlice;
