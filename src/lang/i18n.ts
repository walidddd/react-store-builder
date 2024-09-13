import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './locales/en.json';

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    keySeparator: '.', // We do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
