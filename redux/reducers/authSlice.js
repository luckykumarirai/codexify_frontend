import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authVar",
  initialState: {
    authVar: 0,
  },
  reducers: {
    closeModal: (state) => {
      state.authVar = 0;
    },
    doLogin: (state) => {
      state.authVar = 1;
    },
    doRegister: (state, action) => {
      state.authVar = 2;
    },
  },
});

export const { closeModal, doLogin, doRegister } = authSlice.actions;

export default authSlice.reducer;
