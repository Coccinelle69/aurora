"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PriceState {
  amount: number | string;
  sign: string;
  finalPrice: number | string;
  nights: number | string;
}

const initialState: PriceState = {
  amount: 0,
  sign: "€",
  finalPrice: 0,
  nights: 0,
};

interface PricePayload {
  amount: number | string;
  sign: string;
  nights: number | string;
}

const priceSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    finalPriceCalc(state, action: PayloadAction<PricePayload>) {
      state.amount = action.payload.amount;
      state.sign = action.payload.sign;
      state.nights = action.payload.nights;
      state.finalPrice = +action.payload.amount * +action.payload.nights;
    },
  },
});

export default priceSlice.reducer;
export const { finalPriceCalc } = priceSlice.actions;
