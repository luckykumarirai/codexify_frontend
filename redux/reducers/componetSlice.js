import { createSlice } from "@reduxjs/toolkit";

export const componentSlice = createSlice({
  name: "ComponentRender",
  initialState: {
    componentVar: "",
  },
  reducers: {
    setComponent: (state, action) => {
      state.componentVar = action.payload;
    },
  },
});

export const { setComponent } = componentSlice.actions;

export default componentSlice.reducer;
