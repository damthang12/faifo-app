// components/ui/TabBarBackground.tsx
import { View } from 'react-native';

export default function TabBarBackground() {
  return (
      <View
          className="bg-white border border-gray-200 flex items-center justify-center px-4 left-4 right-4 bottom-5"
          style={{
            height: 72,
            marginTop: 10,
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
