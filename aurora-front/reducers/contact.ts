import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

interface PersistPayload {
  key: keyof ContactState;
  value: string;
}

const initialState: ContactState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    persistField(state, action: PayloadAction<PersistPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetField() {
      return initialState;
    },
  },
});

export const { persistField, resetField } = contactSlice.actions;
export default contactSlice.reducer;
