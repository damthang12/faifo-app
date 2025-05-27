import {Tabs} from 'expo-router';
import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import TabBarBackground from "@/components/layout/TabBarBackground";
import ChatBot from "@/assets/Icon/ChatBot";
import Profile from "@/assets/Icon/Profile";
import PlanIcon from "@/assets/Icon/Map";
import CameraFifoIcon from "@/assets/Icon/CameraFaifo";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: 'transparent',
              height: 75,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          }}
      >
        <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="camera"
            options={{
              tabBarIcon: ({ color }) => <CameraFifoIcon size={24}  color={color} />,
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
              tabBarIcon: ({ color }) => <ChatBot size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="plan"
            options={{
              tabBarIcon: ({ color }) => <PlanIcon size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ color }) => <Profile size={24} color={color} />,
            }}
        />
      </Tabs>
  );
}
