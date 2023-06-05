import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Welcome } from "@/types/searchTypes";
import randomApiKey from "@/utils/randomApiKey";

interface SearchState {
  data: Welcome;
  status: "idle" | "loading" | "succeeded" | "failed";
  searchedTerm: string;
}

const initialState: SearchState = {
  data: {
    data: [],
  },
  status: "idle",
  searchedTerm: "",
};

export const fetchSearchResult = createAsyncThunk(
  "search/fetchSearchResult",
  async (query: string) => {
    const rapidAPIKey = randomApiKey();

    const response = await axios.get(`https://yt-api.p.rapidapi.com/search`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        query,
        lang: "en",
      },
    });
    console.log("SearchResult fetched");

    return response.data;
  }
);

export const fetchAdditionalSearchResult = createAsyncThunk(
  "search/fetchAdditionalSearchResult",
  async ({ token, query }: { token: string; query: string }, { getState }) => {
    const rapidAPIKey = randomApiKey();

    const currentState = getState() as RootState;
    const prevData = currentState.searchReducer.data.data;

    const response = await axios.get(`https://yt-api.p.rapidapi.com/search`, {
      headers: {
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        "X-RapidAPI-Key": rapidAPIKey,
      },
      params: {
        token,
        query,
        lang: "en",
      },
    });

    const newData = response.data.data;
    const newContinuation = response.data.continuation;
    const combinedData = [...prevData, ...newData];

    console.log("SearchResult updated");

    return {
      ...currentState.searchReducer.data,
      continuation: newContinuation,
      data: combinedData,
    };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchedTerm: (state, action) => {
      state.searchedTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSearchResult.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAdditionalSearchResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdditionalSearchResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export const { setSearchedTerm } = searchSlice.actions;

export default searchSlice.reducer;
