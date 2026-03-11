import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalProps: null,
    mode: "add",
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.mode = "add";
      state.modalProps = { query: action.payload };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModalEdit: (state, action) => {
      state.isOpen = true;
      state.mode = "edit";
      state.modalProps = action.payload;
    },
  },
  selectors: {
    modalSelector: (sliceModal) => sliceModal,
  },
});

export const { openModal, closeModal, openModalEdit } = modalSlice.actions;
export const { modalSelector } = modalSlice.selectors;
export default modalSlice.reducer;
