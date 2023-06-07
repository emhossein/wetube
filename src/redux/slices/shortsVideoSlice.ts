import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ShortsList } from "@/types/videoTypes";
import axios from "axios";

interface ShortsListState {
  data: ShortsList;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ShortsListState = {
  data: {
    data: [],
  },
  status: "idle",
};

export const fetchShorts = createAsyncThunk(
  "shorts/fetchShorts",
  async (id: string) => {
    const response = await axios.get(
      `https://one-api.ir/youtube/?token=${process.env.ONEKEY}&action=fullvideo&id=${id}`
    );
    console.log("shorts fetched");

    return response.data.result;
  }
);

export const fetchAdditionalShorts = createAsyncThunk(
  "shortsList/fetchAdditionalShorts",
  async ({ id }: { id: string }, { getState }) => {
    const currentState = getState() as RootState;
    const prevData = currentState.shortsListReducer.data.data;

    const response = await axios.get(
      `https://one-api.ir/youtube/?token=${process.env.ONEKEY}&action=fullvideo&id=${id}`
    );

    const newData = response.data.result;
    const combinedData = [...prevData, newData];

    console.log("shortsList updated");

    return {
      data: combinedData,
    };
  }
);

const shortsListSlice = createSlice({
  name: "shortsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShorts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShorts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.data.push(action.payload);
      })
      .addCase(fetchShorts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalShorts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalShorts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default shortsListSlice.reducer;
