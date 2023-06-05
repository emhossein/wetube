import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome } from "@/types/channelDetailsTypes";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelDetailsState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelDetailsState = {
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
      videosCount: "",
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

export const fetchChannelDetails = createAsyncThunk(
  "channelDetails/fetchChannelDetails",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/home`,
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
    console.log("channelDetails fetched");

    return response.data as Welcome;
  }
);

const channelDetailsSlice = createSlice({
  name: "channelDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelDetails.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default channelDetailsSlice.reducer;
