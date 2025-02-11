import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./slices/apiSlice";
import discoverReducer from "./slices/discover";
import themeReducer from "./slices/themeSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    discover: discoverReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    theme: themeReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
