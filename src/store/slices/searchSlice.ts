import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
  },
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = searchSlice.actions;

export default searchSlice.reducer;
