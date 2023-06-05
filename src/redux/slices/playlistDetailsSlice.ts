import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Datum, Welcome } from "@/types/playlistDetailTypes";
import randomApiKey from "@/utils/randomApiKey";

interface PlaylistState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PlaylistState = {
  data: {
    meta: {
      playlistId: "",
      title: "",
      description: null,
      thumbnail: [],
      videoCount: "",
      videoCountText: "",
      viewCount: "",
      viewCountText: "",
      lastUpdated: "",
      avatar: [],
      channelTitle: "",
      channelId: "",
      isEditable: false,
      privacy: "",
    },
    continuation: "",
    data: [],
    msg: "",
  },
  status: "idle",
};

export const fetchPlaylistDetails = createAsyncThunk(
  "playlistDetails/fetchPlaylistDetails",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(`https://yt-api.p.rapidapi.com/playlist`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        id,
        lang: "en",
      },
    });
    console.log("playlistDetails fetched");

    return response.data as Welcome;
  }
);

export const fetchAdditionalPlaylistDetails = createAsyncThunk(
  "playlistDetails/fetchAdditionalPlaylistDetails",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.playlistDetailsReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/playlist`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        id,
        token,
        lang: "en",
      },
    });

    const newData = response.data.data as Datum[];
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    return {
      ...currentState.playlistDetailsReducer.data,
      continuation: newContinuation,
      data: combinedData,
    } as Welcome;
  }
);

const playlistDetailsSlice = createSlice({
  name: "playlistDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylistDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPlaylistDetails.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalPlaylistDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalPlaylistDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default playlistDetailsSlice.reducer;
