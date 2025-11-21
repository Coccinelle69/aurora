import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
  arrival: string;
  departure: string;
  guests: string;
  adults: string;
  children: string;
  teens: string;
}

interface PersistPayload {
  key: keyof searchState;
  value: string;
}

const today = new Date().toISOString().slice(0, 10);

const initialState: searchState = {
  arrival: today,
  departure: "",
  guests: "1",
  adults: "1",
  children: "0",
  teens: "0",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    persistSearchInput(state, action: PayloadAction<PersistPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { persistSearchInput } = searchSlice.actions;
export default searchSlice.reducer;
