import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome } from "@/types/videoTypes";

interface PlaylistState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PlaylistState = {
  data: {
    result: { formats: [], format: "", subtitles: { en: [] } },
  },
  status: "idle",
};

export const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async (id: string) => {
    const response = await axios.get(
      `https://one-api.ir/youtube/?token=${process.env.ONEKEY}&action=fullvideo&id=${id}`
    );
    console.log("video fetched");

    return response.data as Welcome;
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVideo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default videoSlice.reducer;