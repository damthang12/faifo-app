// components/ui/TabBarBackground.tsx
import { View } from 'react-native';

export default function TabBarBackground() {
  return (
      <View
          className="bg-blue-300 border border-gray-200 w-full flex items-center justify-center px-4 left-3 right-3 bottom-6"
          style={{
            height: 72,
            marginTop: 16,
            borderRadius: 100,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 5,
          }}
      />
  );
}
