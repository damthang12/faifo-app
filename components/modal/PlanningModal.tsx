import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import React, {useMemo, useState} from "react";
import {useTripStore} from "@/store/useTripStore";
import {useToast} from "@/components/Toast";
import Modal from "react-native-modal";


interface Props {
  place: {
    id: string,
    time: string,
    title: string,
    location: string,
  }
  onClose: () => void
  showModal: boolean
}

export default function PlanningModal({place, onClose, showModal}: Props) {
  const router = useRouter();
  const [selectedTripId, setSelectedTripId] = useState('');
  const {addItineraryItem, itinerary} = useTripStore();
  const [day, setDay] = useState('');
  const {showToast} = useToast()
  
  
  const handleSelectedId = (selectedId: string) => {
    setSelectedTripId(selectedId);
  };
  
  
  const trip = itinerary.find(item => item.id === selectedTripId);
  const startDate = trip?.startDate;
  
  const handleSeeMore = () => {
    router.push('/(noti)/MaintenanceScreen')
  }
  
  
  const handleAddToDay = (day: string) => {
    const placeInfo = {
      id: place.id,
      time: place.time,
      title: place.title,
      location: place.location || '',
    };
    
    addItineraryItem(trip?.id || '', day, placeInfo);
    showToast('Lịch trình này đã được thêm vào trong chuyến đi này của bạn. Bạn có thể xem hoặc chỉnh sửa lại nếu muốn.',
      'success',
      (
        <TouchableOpacity
          onPress={handleSeeMore}
          className="p-3 bg-white border-gray-400 border w-[143px] rounded-[32px]  mt-3">
          
          <Text className="text-gray-900 font-beVN font-semibold text-center "> Xem lịch trình</Text>
        </TouchableOpacity>
      )
    )
    onClose()
  };
  
  
  const DayOptions = startDate ? generateDayOptions(startDate, 5) : [];
  
  function generateDayOptions(startDate: string, totalDays: number): string[] {
    const baseParts = startDate.split('/'); // "10/6/2025"
    const baseDate = new Date(+baseParts[2], +baseParts[1] - 1, +baseParts[0]);
    const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return Array.from({length: totalDays}, (_, i) => {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i); // 👉 Tự động tăng ngày
      
      const weekday = weekdays[currentDate.getDay()]; // 👉 Tự động tính thứ
      const dateStr = currentDate.toLocaleDateString('vi-VN'); // "dd/MM/yyyy"
      
      return `Ngày ${i + 1} - ${weekday}, ${dateStr}`;
    });
  }
  
  
  const renderModal = () => {
    if(!trip?.id) {
      
      return (
        <>
          <Text className="text-xl w-full font-beVNBold mb-4">Chọn kế hoạch</Text>
          
          {itinerary.length > 0 ? (
            itinerary.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                onPress={() => handleSelectedId(trip.id)}
                className="p-3 border-b border-gray-200 w-full"
              >
                <Text className="text-lg text-gray-800">{trip.place} - {trip.startDate}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-base text-gray-500 w-full">Bạn chưa có kế hoạch nào</Text>
          )}
          
          <View className="flex flex-row mt-6 justify-between w-full">
            
            {/* Nút xác nhận */}
            <TouchableOpacity
              onPress={onClose}
              className="w-[48%] bg-[#F99F04] px-4 py-3 rounded-full items-center"
            >
              <Text className="text-white text-xl font-semibold font-beVNSemibold">Huỷ</Text>
            </TouchableOpacity>
            {/* Nút tạo kế hoạch */}
            <TouchableOpacity
              onPress={() => {
                itinerary.length === 0 && router.push('/(tabs)/plan')
                onClose()
                
              }}
              disabled={itinerary.length > 0}
              className={`w-[48%] px-4 py-3 rounded-full items-center border ${itinerary.length > 0 ? 'border-gray-300 bg-gray-100' : 'border-[#F99F04]'}`}
            >
              <Text
                className={`text-xl font-semibold font-beVNSemibold ${itinerary.length > 0 ? 'text-gray-400' : 'text-[#F99F04]'}`}>
                Tạo kế hoạch
              </Text>
            </TouchableOpacity>
          
          </View>
        </>
      
      )
    }
    return (
      
      <View className="overflow-y-auto h-[350px] w-full">
        <Text className="text-left font-beVNBold text-2xl  text-gray-900 mb-4">Chọn ngày thêm lịch
          trình</Text>
        <ScrollView className="">
          {DayOptions?.map((item, index) => (
            <TouchableOpacity
              key={`${item} + ${index}}`}
              onPress={() => setDay(item)}
              className={`p-3 gap-2 flex-col   `}
            >
              <Text
                className={`text-center text-xl font-beVNSemibold ${
                  item === day ? 'text-[#F99F04]' : 'text-gray-700'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View className="flex w-auto flex-row  justify-between gap-3 overflow-hidden">
          <TouchableOpacity
            onPress={onClose}
            className=" w-[48%]   px-4 py-3 rounded-full items-center border border-[#F99F04]">
            <Text className="text-[#F99F04] text-xl font-semibold font-beVNSemibold">Huỷ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleAddToDay(day)}
            className=" w-[48%]  bg-[#F99F04] px-4 py-3  rounded-full items-center">
            <Text className="text-white text-xl font-semibold font-beVNSemibold">Xác nhận</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    )
    
  }
  
  
  return (
    <View className="flex-1 bg-white">
      <Modal isVisible={showModal} onBackdropPress={onClose}
             swipeDirection="down"
             style={{justifyContent: 'flex-end', margin: 0}}
      >
        <View className="bg-white px-4 pt-5 pb-10 rounded-t-3xl gap-2 flex-col items-center">
          <View className="h-[6px] w-[100px] bg-gray-300 rounded-2xl"/>
          {renderModal()}
        
        </View>
      </Modal>
    </View>
  
  
  );
}
