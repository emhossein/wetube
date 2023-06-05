import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Welcome } from "@/types/channelVideosTypes";
import randomApiKey from "@/utils/randomApiKey";

interface ChannelPlaylistsState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ChannelPlaylistsState = {
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

export const fetchChannelPlaylists = createAsyncThunk(
  "channelPlaylists/fetchChannelPlaylists",
  async (id: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(
      `https://yt-api.p.rapidapi.com/channel/playlists`,
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
    console.log("channelPlaylists fetched");

    return response.data as Welcome;
  }
);

const channelPlaylistsSlice = createSlice({
  name: "channelPlaylists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannelPlaylists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannelPlaylists.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default channelPlaylistsSlice.reducer;
