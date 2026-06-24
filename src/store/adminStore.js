import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdminStore = create(
    persist(
        (set) => ({
            adminData: null,

            setAdminData: (data) => set({ adminData: data }),

            clearAdminData: () => set({ adminData: null }),
        }),
        {
            name: 'pulseplay-admin-storage',
        }
    )
);