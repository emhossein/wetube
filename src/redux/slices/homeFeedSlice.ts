import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Filter, HomeFeedState, WelcomeDatum } from "@/types/homeFeedTypes";

const initialState: HomeFeedState = {
  filters: [],
  continuation: "",
  data: [],
  msg: "",
  status: "idle",
};

export const fetchHomeFeed = createAsyncThunk(
  "homeFeed/fetchHomeFeed",
  async () => {
    const response = await axios.get(`https://yt-api.p.rapidapi.com/home`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDKEY1,
      },
      params: {
        lang: "en",
      },
    });
    console.log("homeFeed fetched");

    return response.data;
  }
);

const homeFeedSlice = createSlice({
  name: "homeFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHomeFeed.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default homeFeedSlice.reducer;
