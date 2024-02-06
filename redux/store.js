import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import authReducer from "../redux/reducers/authSlice";
import userReducer from "../redux/reducers/userSlice";
import componentReducer from "./reducers/componetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    componentRender: componentReducer,
  },
});
