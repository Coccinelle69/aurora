import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import hr from "./hr.json";
import es from "./es.json";
import zh from "./zh.json";
import ru from "./ru.json";
import it from "./it.json";
import sl from "./sl.json";

export const languageResources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  hr: { translation: hr },
  es: { translation: es },
  zh: { translation: zh },
  ru: { translation: ru },
  it: { translation: it },
  sl: { translation: sl },
};
i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: languageResources,
});
export default i18next;
