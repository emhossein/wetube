import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Datum, Welcome } from "@/types/channelVideosTypes";
import { RootState } from "../store";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelVideosState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelVideosState = {
  data: {
    meta: {
      channelId: "",
      title: "",
      description: "",
      channelHandle: "",
      banner: [],
      tvBanner: [],
      mobileBanner: [],
      avatar: [],
      subscriberCountText: "",
      subscriberCount: 0,
      videosCountText: "",
      videosCount: 0,
      isVerified: false,
      keywords: [],
      isFamilySafe: false,
      availableCountries: [],
      tabs: [],
    },
    continuation: "",
    data: [],
    msg: "",
  },
  status: "idle",
};

export const fetchChannelVideos = createAsyncThunk(
  "channelVideos/fetchChannelVideos",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/videos`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
        },
      }
    );
    console.log("channelVideos fetched");

    return response.data as Welcome;
  }
);

export const fetchAdditionalChannelVideos = createAsyncThunk(
  "channelVideos/fetchAdditionalChannelVideos",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.channelVideosReducer.data.data;

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/videos`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          id,
          token,
        },
      }
    );

    const newData = response.data.data as Datum[];
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    return {
      ...currentState.channelVideosReducer.data,
      continuation: newContinuation,
      data: combinedData,
    } as Welcome;
  }
);

const channelVideosSlice = createSlice({
  name: "channelVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelVideos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalChannelVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalChannelVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default channelVideosSlice.reducer;
