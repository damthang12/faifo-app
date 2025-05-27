import {ImageSourcePropType} from "react-native";

interface ItineraryItem {
    id: string;
    time: string;
    title: string;
    location?: string;
}

interface Days {
    plan?: string;
    day: string;
    itinerary: ItineraryItem[];
}



export interface Planning {
    id: string;
    startDate: string;
    endDate: string;
    participants: number;
    place?: string;
    notes: string;
    isFinished?: boolean;
    image: ImageSourcePropType;
    items: Days[];
}
