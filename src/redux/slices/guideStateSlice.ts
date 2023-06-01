import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  page: string;
}

const initialState: InitialState = {
  page: "home",
};

export const guideState = createSlice({
  name: "guideState",
  initialState,
  reducers: {
    pageChange: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { pageChange } = guideState.actions;

export default guideState.reducer;
