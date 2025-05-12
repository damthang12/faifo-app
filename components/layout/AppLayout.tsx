import { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children: ReactNode;
}

export default function AppLayoutWrapper({ children }: Props) {
  return <View className="w-full h-full bg-white font-beVN">{children}</View>;
}
