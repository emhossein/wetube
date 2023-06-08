import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Welcome } from "@/types/hashtagTypes";
import axios from "axios";
import randomApiKey from "@/utils/randomApiKey";

interface hashtagState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: hashtagState = {
  data: {
    data: [],
  },
  status: "idle",
};

export const fetchHashtagResult = createAsyncThunk(
  "hashtag/fetchHashtagResult",
  async (tag: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(`https://yt-api.p.rapidapi.com/hashtag`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        tag,
        lang: "en",
        geo: "US",
      },
    });
    console.log("hashtagResult fetched");

    return response.data;
  }
);

export const fetchAdditionalHashtagResult = createAsyncThunk(
  "hashtag/fetchAdditionalHashtagResult",
  async ({ tag, token }: { tag: string; token: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.hashtagReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/hashtag`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        tag,
        token,
        lang: "en",
        geo: "US",
      },
    });

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData!, ...newData];

    console.log("hashtagResult updated");

    return {
      ...currentState.hashtagReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
  }
);

const hashtagSlice = createSlice({
  name: "hashtag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHashtagResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHashtagResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHashtagResult.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalHashtagResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalHashtagResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default hashtagSlice.reducer;
