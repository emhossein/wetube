import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Welcome } from "@/types/videoCommentsTypes";

interface RelatedVideosState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RelatedVideosState = {
  data: { data: [] },
  status: "idle",
};

export const fetchVideoComments = createAsyncThunk(
  "videoComments/fetchVideoComments",
  async (id: string) => {
    const response = await axios.get(`https://yt-api.p.rapidapi.com/comments`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDKEY1,
      },
      params: {
        lang: "en",
        id,
      },
    });
    console.log("videoComments fetched");

    return response.data;
  }
);

export const fetchAdditionalVideoComments = createAsyncThunk(
  "videoComments/fetchAdditionalVideoComments",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const currentState = getState() as RootState;
    const prevData = currentState.videoCommentsReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/comments`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDKEY1,
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

    console.log("videoComments updated");

    return {
      ...currentState.videoCommentsReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
  }
);

const relatedVideosSlice = createSlice({
  name: "videoComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVideoComments.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalVideoComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalVideoComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default relatedVideosSlice.reducer;
