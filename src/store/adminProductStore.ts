/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import type { AdminProduct } from '../types/product';
import adminProductService from '../services/adminProductService';
import { useUIStore } from './uiStore'; 

interface AdminProductState {
    products: AdminProduct[];
    isLoading: boolean;
    error: string | null;
    fetchAdminProducts: () => Promise<void>;
    createAdminProduct: (code: string) => Promise<AdminProduct | null>;
    updateAdminProduct: (id: number, code: string) => Promise<boolean>;
    clearAdminProducts: () => void;
    getProductById: (id: number) => AdminProduct | undefined;
}

export const useAdminProductStore = create<AdminProductState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchAdminProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const products = await adminProductService.getAllProducts();
            set({ products, isLoading: false });
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch products';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
        }
    },
    createAdminProduct: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const newProduct = await adminProductService.createProduct(code);
            set((state) => ({
                products: [...state.products, newProduct],
                isLoading: false,
            }));
            useUIStore.getState().showNotification('Продукт успішно створено', 'success');
            return newProduct;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to create product';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
            return null;
        }
    },
    updateAdminProduct: async (id, code) => {
        set({ isLoading: true, error: null });
        try {
            const updatedProduct = await adminProductService.updateProductByAdmin(id, code);
            set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p),
                isLoading: false,
            }));
            useUIStore.getState().showNotification('Продукт успішно оновлено', 'success');
            return true;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to update product';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
            return false;
        }
    },
    clearAdminProducts: () => set({ products: [], isLoading: false, error: null }),
    getProductById: (id: number) => get().products.find(p => p.id === id),
}));