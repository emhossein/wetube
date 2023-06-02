import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  page: string;
  showGuide: boolean;
}

const initialState: InitialState = {
  page: "home",
  showGuide: true,
};

export const guideState = createSlice({
  name: "guideState",
  initialState,
  reducers: {
    pageChange: (state, action) => {
      state.page = action.payload;
    },
    toggleShowGuide: (state) => {
      state.showGuide = !state.showGuide;
    },
  },
});

export const { pageChange, toggleShowGuide } = guideState.actions;

export default guideState.reducer;
