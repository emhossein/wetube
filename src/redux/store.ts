import { configureStore } from "@reduxjs/toolkit";

import guideStateReducer from "./slices/guideStateSlice";
import homeFeedReducer from "./slices/homeFeedSlice";
import channelDetailsReducer from "./slices/channelDetailsSlice";
import channelTabsStateReducer from "./slices/channelTabsStateSlice";
import channelVideosReducer from "./slices/channelVideosSlice";
import channelShortsReducer from "./slices/channelShortsSlice";
import channelLiveStreamsReducer from "./slices/channelLiveStreamsSlice";
import channelPlaylistsReducer from "./slices/channelPlayListsSlice";
import channelCommunityReducer from "./slices/channelCommunitySlice";
import playlistDetailsReducer from "./slices/playlistDetailsSlice";

export const store = configureStore({
  reducer: {
    guideStateReducer,
    homeFeedReducer,
    channelDetailsReducer,
    channelTabsStateReducer,
    channelVideosReducer,
    channelShortsReducer,
    channelLiveStreamsReducer,
    channelPlaylistsReducer,
    channelCommunityReducer,
    playlistDetailsReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
