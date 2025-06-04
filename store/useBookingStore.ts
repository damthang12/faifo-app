// 📁 store/bookingStore.ts
import { create } from 'zustand';
import {ImageSourcePropType} from "react-native";

interface BookingData {
    id: string;
    name: string;
    date: string;
    time: string;
    img: ImageSourcePropType;
    isCancel: boolean;
    location: string;
    status: string;
}

interface BookingStore {
    bookings: BookingData[];
    addBooking: (booking: BookingData) => void;
    cancelBooking: (id: string) => void;
    clearBookings: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    bookings: [],
    addBooking: (booking) =>
        set((state) => ({
            bookings: [...state.bookings, booking],
        })),
    cancelBooking: (id) =>
        set((state) => ({
            bookings: state.bookings.map((b) =>
                b.id === id ? { ...b, isCancel: true } : b
            ),
        })),
    clearBookings: () => set({ bookings: [] }),
}));