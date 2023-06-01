import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Datum, Welcome } from "@/types/channelCommunityPostsTypes";

interface ChannelCommunityState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelCommunityState = {
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

export const fetchChannelCommunity = createAsyncThunk(
  "channelCommunity/fetchChannelCommunity",
  async (id: string) => {
    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/community`,
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
    console.log("channelCommunity fetched");

    return response.data as Welcome;
  }
);

export const fetchAdditionalChannelCommunity = createAsyncThunk(
  "channelCommunity/fetchAdditionalChannelVideos",
  async ({ id, token }: { id: string; token?: string }, { getState }) => {
    const currentState = getState() as RootState;
    const prevData = currentState.channelCommunityReducer.data.data;

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/community`,
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
      ...currentState.channelCommunityReducer.data,
      continuation: newContinuation,
      data: combinedData,
    } as Welcome;
  }
);

const channelCommunitySlice = createSlice({
  name: "channelCommunity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelCommunity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelCommunity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelCommunity.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalChannelCommunity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalChannelCommunity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default channelCommunitySlice.reducer;
