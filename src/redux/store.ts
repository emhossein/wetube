import { configureStore } from "@reduxjs/toolkit";

import guideStateReducer from "./slices/guideStateSlice";
import homeFeedReducer from "./slices/homeFeedSlice";
import channelDetailsReducer from "./slices/channelDetailsSlice";

export const store = configureStore({
  reducer: {
    guideStateReducer,
    homeFeedReducer,
    channelDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
