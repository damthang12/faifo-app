import { useToast } from "@/components/Toast";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

class InviteProps {
  currentMembers?:
    | {
        name: string;
        email: string;
        avatar?: string;
      }[]
    | undefined;
  onInvite?: (email: string) => void;
}

export default function Invite({ currentMembers, onInvite }: InviteProps) {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const handleInvite = () => {
    if (email) {
      onInvite?.(email);
      setEmail("");
    }
    showToast(
      "Mời bạn bè thành công!Họ sẽ nhận được thông tin và có thể tham gia vào hành trình cùng bạn. Cùng Faifan tạo ra một chuyến đi tuyệt vời nhé!",
      "success"
    );
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6 tablet:px-8 tablet:pt-10 ">
      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Members Section */}
        <Text className="text-lg font-semibold font-beVNSemibold mb-4 tablet:text-2xl tablet:mb-6">
          Thành viên chuyến đi
        </Text>
        {currentMembers?.map((member, index) => (
          <View key={index} className="flex-row items-center gap-3 mb-4">
            <View className="w-[52px] h-[52px] rounded-full bg-gray-200 overflow-hidden tablet:w-[72px] tablet:h-[72px]">
              {member.avatar ? (
                <Image
                  source={{ uri: member.avatar }}
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full bg-[#F99F04] items-center justify-center">
                  <Text className="text-white text-lg tablet:text-2xl">
                    {member.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="text-gray-900 font-semibold font-beVNSemibold tablet:text-xl">
                {member.name}
              </Text>
              <Text className="text-gray-500 font-beVN">{member.email}</Text>
            </View>
          </View>
        ))}

        <View className="w-full h-[1px] bg-gray-300 my-6" />

        {/* Invite Form */}
        <Text className="text-lg font-semibold font-beVNSemibold mb-2 tablet:text-2xl tablet:mb-4">
          Mời bạn bè
        </Text>
        <View className="flex-row items-center gap-2 ">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập Email của bạn bè"
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1  rounded-xl p-4 border border-gray-300 tablet:text-xl"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-[100px] left-4 right-4 tablet:bottom-[150px] tablet:left-8 tablet:right-8 ">
        <TouchableOpacity
          onPress={handleInvite}
          className="bg-[#F99F04] p-4 rounded-full items-center"
        >
          <Text className="text-white font-medium font-beVN tablet:text-xl">
            Mời bạn bè
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
