import {create} from 'zustand';
import {Days, ItineraryItem, Planning} from "@/types/type";

interface TripStore {
    itinerary: Planning[];
    addPlan: (items: Planning[]) => void;
    updateTripItinerary: (tripId: string, newDays: Days[]) => void;
    addItineraryItem: (tripId:string,day: string, item: ItineraryItem) => void;
    clearItinerary: () => void;
    hasItineraryItem: (itemId: string) => boolean;
    addPlannedTrip: (plan: Planning) => void;
    updatePlannedTrip: (tripId: string, updatedTrip: Planning) => void;

}

export const useTripStore = create<TripStore>((set, get) => ({
    itinerary: [],

    addPlan: (items) => set({ itinerary: items }),
    addPlannedTrip: (plan) =>
        set((state) => ({ itinerary: [...state.itinerary, plan] })),
    updatePlannedTrip: (tripId, updatedTrip) => (
        set((state) => ({
            itinerary: state.itinerary.map((trip) =>
                trip.id === tripId ? { ...trip, ...updatedTrip } : trip
            ),
        }))
    ),
    updateTripItinerary: (tripId, newDays: Days[]) =>
        set((state) => ({
            itinerary: state.itinerary.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        items: [...trip.items, ...newDays],
                    }
                    : trip
            ),
        })
    ),

    addItineraryItem: (tripId: string, day: string, item: ItineraryItem) =>
        set((state) => {
            const itinerary = [...state.itinerary];
            const planIndex = itinerary.findIndex((p) => p.id === tripId);

            if (planIndex === -1) return { itinerary }; // Không tìm thấy kế hoạch

            const plan = itinerary[planIndex];
            const items = [...plan.items];

            const dayIndex = items.findIndex((d) => d.day === day);

            if (dayIndex !== -1) {
                const existingItems = items[dayIndex].itinerary;

                const isDuplicate = existingItems.some((i) => i.id === item.id);
                if (!isDuplicate) {
                    // Thêm nếu chưa có
                    items[dayIndex] = {
                        ...items[dayIndex],
                        itinerary: [...existingItems, item],
                    };
                }
            } else {
                items.push({
                    day,
                    itinerary: [item],
                });
            }

            itinerary[planIndex] = {
                ...plan,
                items,
            };

            return { itinerary };
        }),




    clearItinerary: () => set({ itinerary: [] }),

    hasItineraryItem: (itemId) =>
        get().itinerary.some(plan =>
            plan.items.some(day =>
                day.itinerary.some(item => item.id === itemId)
            )
        ),
}));
