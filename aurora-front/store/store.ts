"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { language, currency, contact, search, price, modal } from "@/reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  language,
  currency,
  contact,
  search,
  price,
  modal,
});

const persistConfig = {
  key: "app-storage",
  storage,
  whitelist: ["language", "currency", "contact", "search", "price", "modal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
