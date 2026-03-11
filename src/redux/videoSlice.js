import { createSlice } from "@reduxjs/toolkit";
import { getVideo } from "../api/VideoAPI";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    isSearched: false,
    value: [],
    currentSearch: "",
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getVideo.fulfilled, (state, action) => {
        state.value = action.payload.items;
        state.currentSearch = action.payload.searchText;
        state.total = action.payload.totalCount;
        state.isSearched = true;
        state.loading = false;
        state.error = false;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
});

export default videoSlice.reducer;
