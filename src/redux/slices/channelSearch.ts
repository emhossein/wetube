import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Welcome } from "@/types/searchTypes";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelSearchState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelSearchState = {
  data: {
    data: [],
  },
  status: "idle",
};

export const fetchChannelSearchResults = createAsyncThunk(
  "channelSearch/fetchChannelSearchResults",
  async ({ id, query }: { id: string; query: string }) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/search`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
          query,
          lang: "en",
        },
      }
    );
    console.log("channelSearch fetched");

    return response.data as Welcome;
  }
);

export const fetchAdditionalChannelSearch = createAsyncThunk(
  "channelSearch/fetchAdditionalChannelSearch",
  async (
    { id, token, query }: { id: string; token?: string; query: string },
    { getState }
  ) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.channelSearchReducer.data.data;

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/search`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
          token,
          query,
          lang: "en",
        },
      }
    );

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    return {
      ...currentState.channelSearchReducer.data,
      continuation: newContinuation,
      data: combinedData,
    } as Welcome;
  }
);

const channelSearch = createSlice({
  name: "channelSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelSearchResults.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalChannelSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalChannelSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default channelSearch.reducer;
