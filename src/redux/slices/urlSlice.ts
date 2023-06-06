import { UrlTypes } from "@/types/urlTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import randomApiKey from "@/utils/randomApiKey";
import { createSlice } from "@reduxjs/toolkit";

type UrlState = {
  data: UrlTypes;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
};

const initialState: UrlState = {
  data: {},
  status: "idle",
  error: null,
};

const rapidAPIKey = randomApiKey();

export const urlApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://yt-api.p.rapidapi.com/" }),
  endpoints: (builder) => ({
    resolveUrl: builder.query<UrlTypes, string>({
      query: (url) => ({
        url: "resolve",
        headers: {
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPIKey,
        },
        params: {
          url,
        },
      }),
    }),
  }),
});

export const { useResolveUrlQuery } = urlApi;

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(urlApi.endpoints.resolveUrl.matchPending, (state) => {
      state.status = "loading";
    });
    builder.addMatcher(
      urlApi.endpoints.resolveUrl.matchFulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      }
    );
    builder.addMatcher(urlApi.endpoints.resolveUrl.matchRejected, (state) => {
      state.status = "failed";
    });
  },
});

export default urlSlice.reducer;
