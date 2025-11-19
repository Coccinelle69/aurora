"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CurrencyState {
  value: string;
}

const initialState: CurrencyState = {
  value: "EUR",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const { changeCurrency } = currencySlice.actions;
