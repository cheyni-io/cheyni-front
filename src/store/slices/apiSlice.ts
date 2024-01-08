import { API_ENDPOINT_URL, API_RAILWAY_URL } from "src/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT_URL }),
  endpoints: (build) => ({}),
});

export const railwayApi = createApi({
  reducerPath: "railwayAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_RAILWAY_URL }),
  endpoints: (build) => ({}),
});
