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
import videoReducer from "./slices/videosSlice";
import relatedVideosReducer from "./slices/relatedVideosSlice";
import videoCommentsReducer from "./slices/videoCommentsSlice";
import channelFeaturedChannelsReducer from "./slices/channelFeaturedChannelsSlice";

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
    videoReducer,
    relatedVideosReducer,
    videoCommentsReducer,
    channelFeaturedChannelsReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
