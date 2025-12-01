"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PriceState {
  amount: number | string;
  sign: string;
}

const initialState: PriceState = {
  amount: 0,
  sign: "€",
};

interface PricePayload {
  amount: number | string;
  sign: string;
}

const priceSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    finalPriceCalc(state, action: PayloadAction<PricePayload>) {
      state.amount = action.payload.amount;
      state.sign = action.payload.sign;
    },
  },
});

export default priceSlice.reducer;
export const { finalPriceCalc } = priceSlice.actions;
