// store/useLanguageStore.ts
import { create } from 'zustand';
import i18n from '@/i18n';

interface LanguageStore {
    language: string;
    setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
    language: 'vi',
    setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
    },
}));
