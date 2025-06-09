/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import type { AdminUser } from '../types/user';
import adminUserService from '../services/adminUserService'; 
import { useUIStore } from './uiStore';

interface AdminUserManagementState {
    adminUsers: AdminUser[]; 
    isLoading: boolean;
    error: string | null;
    fetchAdminManagedUsers: () => Promise<void>;
    clearAdminManagedUsers: () => void;
}

export const useAdminUserManagementStore = create<AdminUserManagementState>((set) => ({
    adminUsers: [],
    isLoading: false,
    error: null,
    fetchAdminManagedUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const users = await adminUserService.getAllUsers();
            const admins = users.filter(user => user.isAdmin);
            set({ adminUsers: admins, isLoading: false });
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch admin users';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
        }
    },
    clearAdminManagedUsers: () => set({ adminUsers: [], isLoading: false, error: null }),
}));