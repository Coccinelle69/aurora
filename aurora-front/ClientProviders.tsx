"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, RootState, store } from "@/store/store";
import i18next from "@/locales/i18next";
import { I18nextProvider } from "react-i18next";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          const state: RootState = store.getState();
          const savedLang = state.language?.value;
          if (savedLang) i18next.changeLanguage(savedLang);
        }}
      >
        <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
