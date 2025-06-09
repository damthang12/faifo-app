import React from 'react';
import {Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from "expo-router";
import {useLanguageStore} from "@/store/useLanguageStore";
import {useTranslation} from "react-i18next";
import ArrowLeftIcon from "@/assets/Icon/ArrowLeft";

const LANGUAGES = [
    { code: 'vi', label: '🇻🇳 Tiếng Việt (VI)' },
    { code: 'en', label: '🇬🇧 English (EN)' },
    { code: 'ko', label: '🇰🇷 한국어 (KR)' },
];

export default function LanguageScreen() {
    const router = useRouter();
    const {setLanguage, language} = useLanguageStore()
const {t} = useTranslation()

    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };

    const handleSelectLanguage = async (code: string) => {
        setLanguage(code);
    };
    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={handleBack}>
                    <ArrowLeftIcon size={24} color='#000' />
                </TouchableOpacity>
                <Text className="text-xl font-semibold font-beVNSemibold">{t('profile_language')}</Text>
                <View className="w-6 h-6" />
            </View>
            <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}>
                {LANGUAGES.map((lang) => (
                    <Pressable
                        key={lang.code}
                        className="p-6 rounded-xl flex-row items-center justify-between border-b border-gray-300"
                        onPress={() => handleSelectLanguage(lang.code)}
                    >
                        <Text className="text-xl font-semibold font-beVNSemibold">{lang.label}</Text>
                        <View
                            className={`w-6 h-6 rounded-full border-2 ${
                                language === lang.code ? 'border-orange-500 ' : 'border-gray-400'
                            } items-center justify-center`}
                        >
                            {language === lang.code && <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>


    );
}
