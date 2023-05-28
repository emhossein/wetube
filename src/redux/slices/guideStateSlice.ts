import { createSlice } from "@reduxjs/toolkit";

export const guideState = createSlice({
  name: "guideState",
  initialState: {
    page: "home",
  },
  reducers: {
    pageChange: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { pageChange } = guideState.actions;

export default guideState.reducer;
