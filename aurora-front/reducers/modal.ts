"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  value: boolean;
  tab: string;
}

const initialState: ModalState = {
  value: false,
  tab: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.value = true;
      state.tab = action.payload;
    },
    closeModal(state) {
      state.value = false;
      state.tab = "";
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
