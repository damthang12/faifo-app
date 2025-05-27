import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import vi from './locales/vi.json';
import ko from './locales/ko.json';

const resources = {
    en: { translation: en },
    vi: { translation: vi },
    ko: { translation: ko },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
