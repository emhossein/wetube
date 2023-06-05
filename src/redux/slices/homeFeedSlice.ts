import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome } from "@/types/homeFeedTypes";
import { RootState } from "../store";
import randomApiKey from "@/utils/randomApiKey";

interface HomeFeedState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: HomeFeedState = {
  data: {
    continuation: "",
    data: [],
    msg: "",
  },
  status: "idle",
};

export const fetchHomeFeed = createAsyncThunk(
  "homeFeed/fetchHomeFeed",
  async () => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(`https://yt-api.p.rapidapi.com/home`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        lang: "en",
      },
    });
    console.log("homeFeed fetched");

    return response.data;
  }
);

export const fetchAdditionalHomeFeed = createAsyncThunk(
  "homeFeed/fetchAdditionalHomeFeed",
  async ({ token }: { token?: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.homeFeedReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/home`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        lang: "en",
        token,
      },
    });

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    console.log("homeFeed updated");

    return {
      ...currentState.homeFeedReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
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
      })
      .addCase(fetchAdditionalHomeFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalHomeFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default homeFeedSlice.reducer;
