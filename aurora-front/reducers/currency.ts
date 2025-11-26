"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CurrencyState {
  value: string;
  sign: string;
}

const initialState: CurrencyState = {
  value: "EUR",
  sign: "€",
};

interface CurrencyPayload {
  code: string;
  sign: string;
}

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency(state, action: PayloadAction<CurrencyPayload>) {
      state.value = action.payload.code;
      state.sign = action.payload.sign;
    },
  },
});

export default currencySlice.reducer;
export const { changeCurrency } = currencySlice.actions;
