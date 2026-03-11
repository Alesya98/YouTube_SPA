import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: JSON.parse(localStorage.getItem("my_favorites")) || [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push({ id: crypto.randomUUID(), ...action.payload });
    },

    deleteToFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    upDataFavorites: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
  },
  selectors: {
    selectorFavorite: (sliceFavorite) => sliceFavorite.items
  },
});

export const { addToFavorites, deleteToFavorites, upDataFavorites } =
  favoriteSlice.actions;
  export const {selectorFavorite} = favoriteSlice.selectors
export default favoriteSlice.reducer;
