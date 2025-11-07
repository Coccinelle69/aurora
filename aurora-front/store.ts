"use client";

import { configureStore } from "@reduxjs/toolkit";
import language from "@/reducers/language";

export const store = configureStore({
  reducer: {
    language,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
