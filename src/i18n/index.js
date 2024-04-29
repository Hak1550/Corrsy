import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ur, sw} from './locales';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      ur: {
        translation: ur,
      },
      sw: {
        translation: sw,
      },
    },
  });

export default i18next;
