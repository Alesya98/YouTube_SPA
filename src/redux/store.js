import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import favoriteSlice from "./favoritesSlice";
import modalSlice from "./modalSlice";

const favoritesMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("favorite/")) {
    const state = store.getState();
    localStorage.setItem("my_favorites", JSON.stringify(state.favorite.items));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    video: videoSlice,
    favorite: favoriteSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});
