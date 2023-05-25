import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome, WelcomeDatum } from "@/types/channelDetailsTypes";

interface ChannelDetailsState {
  data: Welcome | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelDetailsState = {
  data: null,
  status: "idle",
};

export const fetchChannelDetails = createAsyncThunk(
  "channelDetails/fetchChannelDetails",
  async (id: string) => {
    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/home`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDKEY1,
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
