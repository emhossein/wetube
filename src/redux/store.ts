import urlReducer, { urlApi } from "./slices/urlSlice";

import channelCommunityReducer from "./slices/channelCommunitySlice";
import channelDetailsReducer from "./slices/channelDetailsSlice";
import channelFeaturedChannelsReducer from "./slices/channelFeaturedChannelsSlice";
import channelLiveStreamsReducer from "./slices/channelLiveStreamsSlice";
import channelPlaylistsReducer from "./slices/channelPlayListsSlice";
import channelSearchReducer from "./slices/channelSearch";
import channelShortsReducer from "./slices/channelShortsSlice";
import channelTabsStateReducer from "./slices/channelTabsStateSlice";
import channelVideosReducer from "./slices/channelVideosSlice";
import { configureStore } from "@reduxjs/toolkit";
import guideStateReducer from "./slices/guideStateSlice";
import hashtagReducer from "./slices/hashtagSlice";
import homeFeedReducer from "./slices/homeFeedSlice";
import playlistDetailsReducer from "./slices/playlistDetailsSlice";
import relatedVideosReducer from "./slices/relatedVideosSlice";
import searchReducer from "./slices/searchSlice";
import shortsListReducer from "./slices/shortsVideoSlice";
import shortsSequenceReducer from "./slices/shortsSequenceSlice";
import videoCommentsReducer from "./slices/videoCommentsSlice";
import videoReducer from "./slices/videosSlice";

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
    searchReducer,
    channelSearchReducer,
    urlReducer,
    [urlApi.reducerPath]: urlApi.reducer,
    shortsSequenceReducer,
    shortsListReducer,
    hashtagReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(urlApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
