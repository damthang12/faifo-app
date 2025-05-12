import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBarBackground from "@/components/layout/TabBarBackground";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground, // 👈 gắn vào đây
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: 'transparent',
              height: 72,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          }}
      >
        <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
              tabBarIcon: ({ color }) => <IconSymbol size={26} name="magnifyingglass" color={color} />,
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
              tabBarIcon: ({ color }) => <IconSymbol size={26} name="bubble.left.and.bubble.right.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="map"
            options={{
              tabBarStyle: { display: 'none' },
              tabBarIcon: ({ color }) => <IconSymbol size={26} name="map.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.crop.circle.fill" color={color} />,
            }}
        />
      </Tabs>
  );
}
