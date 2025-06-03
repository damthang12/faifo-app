// 📁 components/CustomTabBar.tsx
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import ChatBot from '@/assets/Icon/ChatBot';
import MapIcon from '@/assets/Icon/Map';
import ProfileIcon from '@/assets/Icon/Profile';
import PlanIcon from "@/assets/Icon/Plan";
import CameraFifoIcon from "@/assets/Icon/CameraFaifo";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import { JSX } from 'react';

const TABS: Record<string, { label: string; icon: (focused: boolean) => JSX.Element }> = {
    index: {
        label: 'Khám phá',
        icon: (focused) => <PlanIcon size={27} color={focused ? '#fff' : '#717680'} />,
    },
    camera: {
        label: 'Ống kính Faifo',
        icon: (focused) => <CameraFifoIcon size={27} color={focused ? '#fff' : '#717680'} />,
    },

    chat: {
        label: 'Hỏi đáp',
        icon: (focused) => <ChatBot size={27} color={focused ? '#fff' : '#717680'} />,
    },
    plan: {
        label: 'Kế hoạch',
        icon: (focused) => <MapIcon size={27} color={focused ? '#fff' : '#717680'} />,
    },
    profile: {
        label: 'Tài khoản',
        icon: (focused) => <ProfileIcon size={27} color={focused ? '#fff' : '#717680'} />,
    },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    return (
        <View className="absolute bottom-8 left-4 right-4 flex-row h-[72px] bg-white rounded-full  justify-around items-center border border-gray-200"
              style={{
                  elevation: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
              }}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const tab = TABS[route.name];


                if (!tab) return null;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        className={`flex-row items-center justify-center   rounded-full ${isFocused ? 'bg-[#8B3A00] px-4 py-2' : ''}`}
                        style={{ minWidth: isFocused ? 100 : 44 }}
                    >
                        {tab.icon(isFocused)}
                        {isFocused && (
                            <Text className="ml-2 font-medium font-beVNSemibold text-white" numberOfLines={1}>
                                {tab.label}
                            </Text>
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
}
