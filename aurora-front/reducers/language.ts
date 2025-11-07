"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  value: string;
}

const initialState: LanguageState = {
  value: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
