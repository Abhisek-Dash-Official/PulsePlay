import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
            userData: null,
            setUserData: (data) => set({ userData: data }),
            clearUserData: () => set({ userData: null }),
        }),
        {
            name: 'pulseplay-user-storage',
        }
    )
);