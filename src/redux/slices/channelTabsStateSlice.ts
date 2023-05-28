import { createSlice } from "@reduxjs/toolkit";

export const channelTabsState = createSlice({
  name: "channelTabsState",
  initialState: {
    tabState: "Home",
  },
  reducers: {
    tabChange: (state, action) => {
      state.tabState = action.payload;
    },
  },
});

export const { tabChange } = channelTabsState.actions;

export default channelTabsState.reducer;
