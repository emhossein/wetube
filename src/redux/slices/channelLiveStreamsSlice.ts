import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Welcome } from "@/types/channelVideosTypes";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelLiveStreamsState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelLiveStreamsState = {
  data: {
    meta: {
      channelId: "",
      title: "",
      description: "",
      channelHandle: "",
      banner: [],
      tvBanner: [],
      mobileBanner: [],
      avatar: [],
      subscriberCountText: "",
      subscriberCount: 0,
      videosCountText: "",
      videosCount: 0,
      isVerified: false,
      keywords: [],
      isFamilySafe: false,
      availableCountries: [],
      tabs: [],
    },
    continuation: "",
    data: [],
    msg: "",
  },
  status: "idle",
};

export const fetchChannelLiveStreams = createAsyncThunk(
  "channelLiveStreams/fetchChannelLiveStreams",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/liveStreams`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
        },
      }
    );
    console.log("channelLiveStreams fetched");

    return response.data as Welcome;
  }
);

const channelLiveStreamsSlice = createSlice({
  name: "channelLiveStreams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelLiveStreams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelLiveStreams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelLiveStreams.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default channelLiveStreamsSlice.reducer;
