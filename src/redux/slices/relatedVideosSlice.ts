import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Welcome } from "@/types/relatedVideoTypes";
import randomApiKey from "@/utils/randomApiKey";

interface RelatedVideosState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RelatedVideosState = {
  data: {
    data: [],
  },
  status: "idle",
};

export const fetchRelatedVideos = createAsyncThunk(
  "relatedVideos/fetchRelatedVideos",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(`https://yt-api.p.rapidapi.com/related`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        lang: "en",
        id,
      },
    });
    console.log("relatedVideos fetched");

    return response.data;
  }
);

export const fetchAdditionalRelatedVideos = createAsyncThunk(
  "relatedVideos/fetchAdditionalRelatedVideos",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.relatedVideosReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/related`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        id,
        lang: "en",
        token,
      },
    });

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    console.log("relatedVideos updated");

    return {
      ...currentState.relatedVideosReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
  }
);

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalRelatedVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalRelatedVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default relatedVideosSlice.reducer;
