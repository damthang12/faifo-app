import { Tabs } from 'expo-router';
import CustomTabBar from "@/components/CustomBar/CustomeBar";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { display: 'none' },
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        />
    );
}