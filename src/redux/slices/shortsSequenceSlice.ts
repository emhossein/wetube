import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Welcome } from "@/types/shortsSequenceTypes";
import axios from "axios";
import randomApiKey from "@/utils/randomApiKey";

interface ShortsSequenceState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ShortsSequenceState = {
  data: {
    data: [],
  },
  status: "idle",
};

export const fetchShortsSequence = createAsyncThunk(
  "shortsSequence/fetchShortsSequence",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/shorts/sequence`,
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
    console.log("shortsSequence fetched");

    return response.data;
  }
);

export const fetchAdditionalShortsSequence = createAsyncThunk(
  "shortsSequence/fetchAdditionalShortsSequence",
  async ({ params }: { params: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.shortsSequenceReducer.data.data;

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/shorts/sequence`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          params,
          lang: "en",
        },
      }
    );

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    console.log("shortsSequence updated");

    return {
      ...currentState.shortsSequenceReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
  }
);

const shortsSequenceSlice = createSlice({
  name: "shortsSequence",
  initialState,
  reducers: {
    deleteData: (state) => {
      state.data.data.length = 0;
      console.log("deleted");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortsSequence.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShortsSequence.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchShortsSequence.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalShortsSequence.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalShortsSequence.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export const { deleteData } = shortsSequenceSlice.actions;

export default shortsSequenceSlice.reducer;
