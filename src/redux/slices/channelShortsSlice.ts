import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Datum, Welcome } from "@/types/channelVideosTypes";

interface ChannelShortsState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelShortsState = {
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

export const fetchChannelShorts = createAsyncThunk(
  "channelShorts/fetchChannelShorts",
  async (id: string) => {
    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/shorts`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDKEY1,
        },
        params: {
          id,
        },
      }
    );
    console.log("channelShorts fetched");

    return response.data as Welcome;
  }
);

export const fetchAdditionalChannelShorts = createAsyncThunk(
  "channelShorts/fetchAdditionalChannelShorts",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const currentState = getState() as RootState;
    const prevData = currentState.channelShortsReducer.data.data;

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/shorts`,
      {
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDKEY1,
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
      ...currentState.channelShortsReducer.data,
      continuation: newContinuation,
      data: combinedData,
    } as Welcome;
  }
);

const channelShorts = createSlice({
  name: "channelShorts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelShorts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelShorts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelShorts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalChannelShorts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalChannelShorts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default channelShorts.reducer;
