// store/useFavoriteStore.ts
import { create } from 'zustand';
import {ImageSourcePropType} from "react-native";

export interface FavoriteItem {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    openTime: string;
    expendTime?: string;
    image: ImageSourcePropType;
    location?: string;
    category: string;
}

export interface FavoriteList {
    id?: string;
    name: string;
    images?: ImageSourcePropType[];
    items: Record<string, FavoriteItem[]>; // category -> items
}

interface FavoriteStore {
    lists: FavoriteList[];
    createFavoriteList: (name: string, id: string, images: any[]) => void;
    addItemToList: (listId: string, item: FavoriteItem) => void;
    isItemInList: (listName: string, itemId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    lists: [],

    createFavoriteList: (name, id, imgs) => {
        const { lists } = get();
        if (lists.some((l) => l.name === name)) return;
        set({ lists: [...lists, { name, id, images: imgs , items: {} }] });
    },

    addItemToList: (listId, item) => {
        const { lists } = get();
        const updated = lists.map((list) => {
            if (list.id !== listId) return list;

            const currentCategoryItems = list.items[item.category] || [];
            if (currentCategoryItems.find((i) => i.id === item.id)) return list;

            return {
                ...list,
                items: {
                    ...list.items,
                    [item.category]: [...currentCategoryItems, item],
                },
            };
        });

        set({ lists: updated });
    },

    isItemInList: (listName, itemId) => {
        const list = get().lists.find((l) => l.name === listName);
        if (!list) return false;
        return Object.values(list.items).some((items) =>
            items.some((item) => item.id === itemId)
        );
    },
}));
