import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome } from "@/types/channelFeaturedChannelsTypes";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelLiveStreamsState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelLiveStreamsState = {
  data: {},
  status: "idle",
};

export const fetchChannelFeaturedChannels = createAsyncThunk(
  "channelFeaturedChannels/fetchChannelFeaturedChannels",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/channels`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
          lang: "en",
        },
      }
    );
    console.log("channelFeaturedChannels fetched");

    return response.data as Welcome;
  }
);

const channelLiveStreamsSlice = createSlice({
  name: "channelFeaturedChannels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelFeaturedChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelFeaturedChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelFeaturedChannels.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default channelLiveStreamsSlice.reducer;
