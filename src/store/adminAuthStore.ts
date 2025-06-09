/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import adminAuthService from '../services/adminAuthService';
import adminUserService from '../services/adminUserService';
import type { SignInDto, AuthResponse, SignUpDto } from '../types/auth';
import type { AdminUser } from '../types/user';
import { useAdminProductStore } from './adminProductStore';
import { useAdminUserManagementStore } from './adminUserManagementStore'; 

interface AdminAuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticatedAdmin: boolean;
    adminUser: AdminUser | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: SignInDto) => Promise<boolean>;
    logout: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    fetchCurrentAdmin: () => Promise<boolean>;
    checkAuthStatus: () => Promise<void>;
    addAdminUser: (adminData: SignUpDto) => Promise<boolean>;
}

export const useAdminAuthStore = create<AdminAuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticatedAdmin: false,
            adminUser: null,
            isLoading: false,
            error: null,

            setTokens: (accessToken, refreshToken) => {
                set({
                    accessToken,
                    refreshToken,
                    error: null,
                });
            },

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const data: AuthResponse = await adminAuthService.signIn(credentials);
                    get().setTokens(data.accessToken, data.refreshToken);
                    const isAdmin = await get().fetchCurrentAdmin();
                    if (!isAdmin) {
                        get().logout();
                        set({ error: 'Доступ заборонено. Ви не адміністратор.', isLoading: false });
                        return false;
                    }
                    set({ isLoading: false });
                    return true;
                } catch (err: any) {
                    const errorMessage = err.response?.data?.message || err.message || 'Login failed';
                    set({ error: errorMessage, isLoading: false, isAuthenticatedAdmin: false, adminUser: null });
                    return false;
                }
            },

            logout: () => {
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticatedAdmin: false,
                    adminUser: null,
                    error: null,
                });
                useAdminProductStore.getState().clearAdminProducts();
                useAdminUserManagementStore.getState().clearAdminManagedUsers();
            },

            fetchCurrentAdmin: async () => {
                if (!get().accessToken) {
                    set({ isAuthenticatedAdmin: false, adminUser: null });
                    return false;
                }
                set({ isLoading: true });
                try {
                    const userData = await adminUserService.getMe();
                    if (userData && userData.isAdmin) {
                        set({ adminUser: userData, isAuthenticatedAdmin: true, isLoading: false, error: null });
                        return true;
                    } else {
                        set({ adminUser: null, isAuthenticatedAdmin: false, isLoading: false, error: 'User is not an admin' });
                        return false;
                    }
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Failed to fetch admin data';
                    set({ isLoading: false, error: errorMessage, isAuthenticatedAdmin: false, adminUser: null });
                    
                    return false;
                }
            },
            checkAuthStatus: async () => {
                const token = get().accessToken;
                if (token) {
                   const isAdmin = await get().fetchCurrentAdmin();
                   if(!isAdmin && get().accessToken) { 
                       get().logout();
                   }
                } else {
                    set({ isAuthenticatedAdmin: false, adminUser: null });
                }
            },
            addAdminUser: async (adminData) => {
                set({isLoading: true, error: null});
                try {
                    await adminAuthService.addAdmin(adminData);
                    set({isLoading: false});
                    useAdminUserManagementStore.getState().fetchAdminManagedUsers();
                    return true;
                } catch (err:any) {
                    const errorMessage = err.response?.data?.message || err.message || 'Failed to add admin';
                    set({error: errorMessage, isLoading: false});
                    return false;
                }
            }
        }),
        {
            name: 'admin-auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        }
    )
);