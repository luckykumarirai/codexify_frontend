import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

const token = Cookies.get("token");

export const userSlice = createSlice({
  name: "user",
  initialState: {
    tokenVar: token,
    userVar: {
      userId: jwt.decode(token)?.userId,
      userName: jwt.decode(token)?.userName,
      firstName: jwt.decode(token)?.firstName,
      lastName: jwt.decode(token)?.lastName,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.userVar = action.payload;
    },
    setToken: (state, action) => {
      state.tokenVar = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
